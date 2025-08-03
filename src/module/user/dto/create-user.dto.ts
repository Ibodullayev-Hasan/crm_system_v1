import {
	IsEmail,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IUser } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";

export class CreateUserDto implements IUser {

	@ApiProperty({
		example: "John Doe",
		description: "Foydalanuvchining to‘liq ismi",
	})
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@ApiProperty({
		example: "john.doe@example.com",
		description: "Foydalanuvchining email manzili",
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: "Pass123!",
		description:
			"Parol 6-10 ta belgidan iborat, katta-kichik harf, raqam va maxsus belgi bo‘lishi shart",
		minLength: 6,
		maxLength: 10,
	})
	@IsNotEmpty()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, {
		message:
			"Parol 6-10 ta belgidan iborat bo‘lishi, katta va kichik harflar, raqamlar hamda maxsus belgilar (@$!%*?&) ni o‘z ichiga olishi kerak",
	})
	password: string;

}
