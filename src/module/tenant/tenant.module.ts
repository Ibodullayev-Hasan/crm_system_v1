import { forwardRef, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './schema/tenant.schema';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { Subscription } from 'rxjs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => Subscription)
  ],
  controllers: [TenantController],
  providers: [TenantService, JwtService],
  exports: [MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]), TenantService]
})
export class TenantModule { }
