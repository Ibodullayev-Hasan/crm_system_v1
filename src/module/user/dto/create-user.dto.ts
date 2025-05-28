import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { IUser } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";
import { Types } from "mongoose";
import { Tenant } from "../../tenant/schema/tenant.schema";

export class CreateUserDto implements IUser {

	@IsNotEmpty()
	@IsString()
	full_name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, {
		message:
			'Parol 6-10 ta belgidan iborat bo‘lishi, katta va kichik harflar, raqamlar hamda maxsus belgilar (@$!%*?&) ni o‘z ichiga olishi kerak',
	})
	password: string;

	@IsOptional()
	@IsEnum(Role, { message: "Role enum must be 'superAdmin', 'admin', 'teacher', 'student'" })
	role?: Role;

	@IsMongoId({ message: "This is mongo ID" })
	@IsOptional()
	tenantId: Tenant | Types.ObjectId;
}
