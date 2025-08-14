import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors';
import { AllExceptionsFilter } from './common/helpers';
import { API_SUB_PATH, DEFAULT_PORT } from './common/constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || DEFAULT_PORT;
  const globalPrefix = configService.get<string>('apiSubPath') || API_SUB_PATH;

  app.setGlobalPrefix(globalPrefix);

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
  
  await app.listen(port);
  console.log(`App running on port ${ port }`)
}

bootstrap();
