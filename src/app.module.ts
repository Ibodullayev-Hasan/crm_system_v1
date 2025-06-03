import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './shared/filters/exceptions.filter';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { TenantModule } from './module/tenant/tenant.module';
import { SubscriptionModule } from './module/subscription/subscription.module';
import { AppController } from './app.controller';
import { DomenMiddleware } from './shared/middleware';


@Module({
  imports: [

    // .env configuratsion
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: [".env"],
    }),

    // db configuratsion
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URL")
      })
    }),

    // modules
    AuthModule,
    UserModule,
    TenantModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DomenMiddleware).forRoutes("*")
  }
}
