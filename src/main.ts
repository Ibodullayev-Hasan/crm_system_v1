import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { createWinstonLogger } from './shared/utils/logger';
import { configs } from './config';
import { NotFoundExceptionFilter } from './shared/filters/router.exption.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupGlobalPipes } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: createWinstonLogger(),
  });

  const logger = new Logger('Crm_server');

  try {
    const configService = app.get(ConfigService)

    // Global pipe
    setupGlobalPipes(app)

    // default prefix
    app.setGlobalPrefix(configs.app.prefix)

    // app version
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: configs.app.version, })
console.log(configs.db.uri);

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
    logger.log(`🚀 Application is running on port ${port}`);
    logger.log(`🌱 Environment: ${configs.app.env}`);
  } catch (error: any) {
    logger.error(error.message)
  }
}
bootstrap();
