  import { DocumentBuilder } from '@nestjs/swagger';

  export const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo list')
    .setDescription('Api for easely controll your todos')
    .setVersion('1.0')
    .addTag('todo-list')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT access token',
        in: 'header',
      },
      'JWT-Auth'
    )
    .addSecurityRequirements('ApiKeyAuth')
    .build();