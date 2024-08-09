import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { serverConfig } from './config/server.config';
import { AllExceptionsFilter } from './shared/exception.filter';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (process.env.NODE_ENV === 'production') {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  }
  app.setGlobalPrefix(serverConfig.basePath);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Swagger DocumentBuilder
  if (serverConfig.enableDocumentation) {
    logger.log('Building API documentation');
    const options = new DocumentBuilder()
      .setTitle('Krowdz')
      .setDescription('Krowdz API')
      .setVersion('1.0.0')
      .addServer(`../${serverConfig.basePath}`, 'Local Server')
      .setExternalDoc('Swagger JSON file', `${serverConfig.shortUrl}/api-json`)
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'api-key')
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(serverConfig.port);
}
bootstrap();
