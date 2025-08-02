import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async userProfile(user: User): Promise<User> {
    try {

      const userData = await this.userModel.findById(user.id).populate("tenantId", "tenant_name").lean();

      if (userData) {
        userData.id = userData._id;
        delete userData._id;
        delete userData.password;
        delete userData.refresh_token;
        delete userData.__v;
      }

      return userData;


    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
