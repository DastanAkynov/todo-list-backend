import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config/app.config';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api')

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc/api', app, document);
  
  const PORT = config.PORT
  await app.listen(PORT || 8000);
}
bootstrap();
