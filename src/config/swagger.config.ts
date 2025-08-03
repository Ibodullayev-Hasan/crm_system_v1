import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SetUpSwagger = (app: INestApplication) => {

	const configService = app.get(ConfigService); // ConfigService ni olish

	const baseUrl_1 = configService.get<string>('API_URL_LOCAL');
	const baseUrl_2 = configService.get<string>('API_URL_PRODUCTION');

	const options = new DocumentBuilder()
		.setTitle('CRM')
		.setDescription('CRM API documentation')
		.setVersion('1.0')
		.addServer(`${baseUrl_1}`, `Localni Server`)
		.addServer(`${baseUrl_2}`, `Dynamic  Server`)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/docs', app, document)
}