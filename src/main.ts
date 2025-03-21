import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')
  console.log('MongoDB URI:', configService.get<string>('MONGODB_URI'));
  setupSwagger(app)
  await app.listen(port)
}
bootstrap();
