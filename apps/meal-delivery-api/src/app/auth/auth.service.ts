import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Identity, IdentityDocument } from './identity.schema';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(
    username: string,
    emailAddress: string,
    isGraduated: boolean,
    role: string
  ): Promise<string> {
    const user = new this.userModel({
      username,
      emailAddress,
      isGraduated,
      role,
    });
    await user.save();
    return user.id;
  }

  async registerUser(username: string, password: string, emailAddress: string) {
    const generatedHash = await hash(
      password,
      parseInt(`${process.env.SALT_ROUNDS}`, 10)
    );

    const identity = new this.identityModel({
      username,
      hash: generatedHash,
      emailAddress,
    });

    await identity.save();
  }

  async getId(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ username: username });
    return user?.id;
  }

  async generateToken(username: string, password: string): Promise<string> {
    const identity = await this.identityModel.findOne({ username });

    if (!identity || !(await compare(password, identity.hash)))
      throw new Error('user not authorized');

    const user = await this.userModel.findOne({ username: username });

    return new Promise((resolve, reject) => {
      sign(
        { username, id: user?.id },
        `${process.env.JWT_SECRET}`,
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, `${process.env.JWT_SECRET}`, (err, payload) => {
        if (err) reject(err);
        else resolve(payload as string);
      });
    });
  }
}
