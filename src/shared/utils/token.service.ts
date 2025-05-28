import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { User } from "../../module/user/schema/user.schema"
import { JwtService } from "@nestjs/jwt"
import * as CryptoJS from "crypto-js"

@Injectable()
export class TokenService {

	private sekretKey: string
	private accessTokentime: string
	private refreshTokentime: string
	private aesKey: string

	constructor(private jwtService: JwtService) {
		this.sekretKey = process.env.SECRET_KEY,
			this.accessTokentime = process.env.JWT_ACCESS_EXPIRES_TIME,
			this.refreshTokentime = process.env.JWT_REFRESH_EXPIRES_TIME,
			this.aesKey = process.env.AES_KEY
	}

	async tokenGenerator(user: User) {
		try {

			if (!this.sekretKey) {
				throw new HttpException('Missing secret keys', HttpStatus.INTERNAL_SERVER_ERROR);
			}

			const payload = { sub: user.id, email: user.email, role: user.role };

			if (!this.accessTokentime || !this.refreshTokentime) {
				throw new HttpException('Missing acc and ref times', HttpStatus.INTERNAL_SERVER_ERROR);
			}
			const [access_token, refresh_token] = await Promise.all([
				this.jwtService.sign(payload, { secret: this.sekretKey, expiresIn: this.accessTokentime, algorithm: "HS256" }),

				this.jwtService.sign(payload, { secret: this.sekretKey, expiresIn: this.refreshTokentime, algorithm: "HS256" }),
			]);

			// JWT'ni AES-256 bilan shifrlash (string formatga o'tkazish)
			const encryptedAccToken = CryptoJS.AES.encrypt(access_token, this.aesKey).toString();
			const encryptedRefToken = CryptoJS.AES.encrypt(refresh_token, this.aesKey).toString();

			return {
				accToken: encryptedAccToken,
				accessExpiresIn: this.accessTokentime,
				refToken: encryptedRefToken,
				refreshExpiresIn: this.refreshTokentime,
			};

		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}