import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, {
		message:
			'Parol 6-10 ta belgidan iborat bo‘lishi, katta va kichik harflar, raqamlar hamda maxsus belgilar (@$!%*?&) ni o‘z ichiga olishi kerak',
	})
	password: string;

}