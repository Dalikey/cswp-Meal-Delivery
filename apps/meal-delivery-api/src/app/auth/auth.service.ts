import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Identity, IdentityDocument } from '../schema/identity.schema';
import { hash, compare } from 'bcrypt';
import { UserRegistration, UserRole } from '@md/data';

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

  async registerUser(credentials: UserRegistration) {
    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.emailAddress ||
      !credentials.role
    ) {
      throw new HttpException(
        'Values must be provided for username, password, emailAddress, and role',
        HttpStatus.BAD_REQUEST
      );
    }

    if (credentials.role !== UserRole.STUDENT) {
      if (credentials.role !== UserRole.OWNER) {
        throw new HttpException(
          'The role must be student or owner',
          HttpStatus.BAD_REQUEST
        );
      }
    }

    const generatedHash = await hash(
      credentials.password,
      parseInt(`${process.env.SALT_ROUNDS}`, 10)
    );

    const identity = new this.identityModel({
      username: credentials.username,
      hash: generatedHash,
      emailAddress: credentials.emailAddress,
    });

    await identity.save();
  }

  async getId(username: string): Promise<string> {
    const user = await this.userModel.findOne({ username: username });
    return user?.id;
  }

  async generateToken(username: string, password: string): Promise<string> {
    const identity = await this.identityModel.findOne({ username });
    console.log('identity', identity);
    if (!identity || !(await compare(password, identity.hash)))
      throw new Error('user not authorized');

    const user = await this.userModel.findOne({ username: username });

    return new Promise((resolve, reject) => {
      sign(
        { username, id: user?.id, role: user?.role },
        `${process.env.JWT_SECRET}`,
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    token = token.replace('Bearer ', '');
    return new Promise((resolve, reject) => {
      verify(token, `${process.env.JWT_SECRET}`, (err, payload) => {
        if (err) reject(err);
        else resolve(payload as string);
      });
    });
  }
}
