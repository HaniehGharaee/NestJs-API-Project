import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { createSwaggerConfig } from './config/config.swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  console.log('MongoDB URI:', configService.get<string>('MONGODB_URI'));

  const nodeEnv = configService.get<string>('nodeEnv');
  if (nodeEnv === 'development') {
    const { config, path } = createSwaggerConfig();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
  }

  app.enableCors({
    origin: 'http://localhost:3001', // front address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/#/`);
}
bootstrap();
