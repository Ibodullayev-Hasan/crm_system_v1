import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTenantDto {

	@IsNotEmpty()
	@IsString()
	tenant_name: string;

	@IsString()
	@IsNotEmpty()
	adress: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^\+998\d{9}$/, { message: 'Telefon raqam formati noto‘g‘ri. +998XXXXXXXXX bo‘lishi kerak.' })
	tenant_phone: string;

}
