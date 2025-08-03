import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './configs/jwt.config';
import { TokenService } from '../../shared/services/token.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService]
})
export class AuthModule { }
