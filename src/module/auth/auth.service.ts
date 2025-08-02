import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../shared/utils/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User, UserDocument } from '../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import *as bcryptjs from "bcryptjs"
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) { }

  // register
  async register(createUserDto: CreateUserDto): Promise<{ user: Omit<User, "password">, accessExpiresIn: string, accToken: string, }> {
    try {

      const existingUser: User = await this.userModel.findOne({ email: createUserDto.email })

      if (existingUser) throw new ConflictException("Existing user! enter another email")

      const hashedPassword: string = await bcryptjs.hash(createUserDto.password, 10)

      const newUser = new this.userModel(createUserDto)


      const savedUser = await newUser.save({ validateBeforeSave: false });
      const { accToken, refToken, accessExpiresIn } = await this.tokenService.tokenGenerator(savedUser)

      savedUser.password = hashedPassword

      savedUser.refresh_token = refToken;

      await savedUser.save();

      const { password, refresh_token, ...result } = savedUser.toObject()

      return { user: result, accToken, accessExpiresIn }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // login
  async login(loginDto: LoginDto): Promise<{ accToken: string, accessExpiresIn: string, refToken: string, refreshExpiresIn: string }> {
    try {

      const user: User = await this.userModel.findOne({ email: loginDto.email })

      if (!user) throw new UnauthorizedException("Unauthorized email!")

      const comparedPassword: boolean = await bcryptjs.compare(loginDto.password, user.password)

      if (!comparedPassword) throw new UnauthorizedException("Invlaid credentials")

      const { accToken, accessExpiresIn, refToken, refreshExpiresIn } = await this.tokenService.tokenGenerator(user)

      await this.userModel.findByIdAndUpdate(user.id, { refresh_token: refToken });

      return { accToken, accessExpiresIn, refToken, refreshExpiresIn }

    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  // log out
  async logOut(userId: Types.ObjectId): Promise<void> {
    try {
      await this.userService.updateHashedRefreshToken(userId, null)

    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // refresh access token
  async refresh(user: User): Promise<{ accToken: string, accessExpiresIn: string }> {
    try {

      const { accToken, accessExpiresIn } = await this.tokenService.tokenGenerator(user)

      return { accToken, accessExpiresIn }

    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}
