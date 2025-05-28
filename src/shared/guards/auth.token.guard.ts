import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from '@nestjs/mongoose';
import * as CryptoJS from 'crypto-js';
import { User, UserDocument } from '../../module/user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtAuthGuard implements CanActivate {

	private jwtSecretKey: string
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {
		this.jwtSecretKey = process.env.SECRET_KEY
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const authHeader = request.headers.authorization

			if (!authHeader || !authHeader.startsWith('Bearer ')) {
				throw new UnauthorizedException(`Missing Authentication Token`)
			}

			let token: string = authHeader.split(" ")[1]
			if (!token) throw new UnauthorizedException(`Missing Authentication Token`)

			// AES ni deshiferlash
			const bytes = CryptoJS.AES.decrypt(token, process.env.AES_KEY)
			token = bytes.toString(CryptoJS.enc.Utf8)

			const decoded = await this.jwtService.verify(token, { secret: this.jwtSecretKey, })
			
			const user: User = await this.userModel.findById(decoded?.sub)

			if (!user) throw new UnauthorizedException(`Ro'yxatdan o'tmagan user`)

			request.user = user
			return true
		} catch (error: any) {
			if (error.name === "JsonWebTokenError" || error.message === "Malformed UTF-8 data") throw new UnauthorizedException("Xato token")

			if (error.name === "TokenExpiredError") throw new UnauthorizedException("Token amal qilish muddati tugagan")

			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
