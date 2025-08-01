import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors';
import { AllExceptionsFilter } from './common/helpers';
import { API_SUB_PATH } from './common/constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_SUB_PATH ?? API_SUB_PATH);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Mi Dashboard API')
    .setDescription('PROYECTO PERSONAL')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
