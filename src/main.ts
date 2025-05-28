import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { createWinstonLogger } from './shared/utils/logger';
import { configs } from './config';
import { NotFoundExceptionFilter } from './shared/filters/router.exption.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createWinstonLogger(),
  });

  const logger = new Logger('Crm_server');

  try {
    const configService = app.get(ConfigService)

    // Global validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // default prefix
    app.setGlobalPrefix(configs.app.prefix)
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: configs.app.version, })
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
    app.setViewEngine('ejs');
    // exeption filter
    app.useGlobalFilters(new NotFoundExceptionFilter())

    // CORS configuration
    app.enableCors({
      origin: configs.cors.origin,
      credentials: true,
    });

    const port = configService.get<number>("SERVER_PORT")
    // server start
    await app.listen(port);
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(`🌱 Environment: ${configs.app.env}`);
  } catch (error: any) {
    logger.error(error.message)
  }
}
bootstrap();
