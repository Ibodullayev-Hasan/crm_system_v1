import { forwardRef, Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './schema/subscription.schema';
import { TenantModule } from '../tenant/tenant.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
    forwardRef(() => TenantModule)
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, JwtService],
  exports: [SubscriptionService, MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }])]
})
export class SubscriptionModule { }
