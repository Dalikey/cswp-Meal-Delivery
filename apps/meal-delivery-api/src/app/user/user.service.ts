import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@meal-delivery/data';
// import { Identity, IdentityDocument } from '../auth/identity.schema';

@Injectable()
export class UserService {
  constructor(
    // @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<UserInfo[]> {
    return this.userModel.find({}, { _id: 0, __v: 0 });
  }

  async getOne(userId: string): Promise<User> {
    const users = await this.userModel.aggregate([
      {
        $match: {
          id: userId,
        },
      },
    ]);

    return users[0];
  }

  async deleteOne(userId: string) {
    await this.userModel
      .deleteOne({ id: userId })
      .then(function () {
        console.log('Data deleted');
      })
      .catch(function (error) {
        console.log(error);
      });
    // await this.identityModel
    //   .deleteOne({ id: userId })
    //   .then(function () {
    //     console.log('Data deleted in identityModel');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
}
