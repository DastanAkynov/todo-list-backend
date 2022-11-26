import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api')
  
  
  const PORT = config.PORT
  await app.listen(PORT || 8000);
}
bootstrap();
