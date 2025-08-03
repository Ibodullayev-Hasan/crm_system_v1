import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    example: 'Edu Center Tashkent',
    description: 'Tenantning (markaz yoki tashkilot) nomi',
  })
  @IsNotEmpty()
  @IsString()
  tenant_name: string;

  @ApiProperty({
    example: 'Toshkent, Chilonzor, 10-kvartal',
    description: 'Tenantning manzili',
  })
  @IsString()
  @IsNotEmpty()
  adress: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Tenantning telefon raqami. Format: +998XXXXXXXXX',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqam formati noto‘g‘ri. +998XXXXXXXXX bo‘lishi kerak.',
  })
  tenant_phone: string;
}
