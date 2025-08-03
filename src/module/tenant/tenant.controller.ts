import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { JwtAuthGuard } from '../../shared/guards/auth.token.guard';
import { RolesGuard } from '../../shared/guards/role.guard';
import { Roles } from '../../shared/decorators';
import { Role } from '../../shared/enums';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Tenant') // Swagger kategoriyasi
@ApiBearerAuth() // JWT token kerak
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create new tenant (Admin only)' })
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({ status: 201, description: 'Tenant successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized – Token missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden – Only Admins can access this route' })
  create(@Body() createTenantDto: CreateTenantDto, @Req() req: Request) {
    return this.tenantService.create(createTenantDto, req?.user);
  }
}
