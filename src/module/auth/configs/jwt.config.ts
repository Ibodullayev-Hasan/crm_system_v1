import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { configs } from '../../../config';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: configs.jwt.secretKey,
    signOptions: {
      expiresIn: configs.jwt.accessTokenTime,
    },
  }),
);
