import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  // update Hashed Refresh Token
  async updateHashedRefreshToken(userId: Types.ObjectId, hashedRefreshToken: string) {
    return this.userModel.findByIdAndUpdate(userId, { refresh_token: hashedRefreshToken })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
