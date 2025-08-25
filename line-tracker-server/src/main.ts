import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './socket/adapter/redis-io.adapter';
import { ConfigService } from '@nestjs/config';

// Show Copyright Info
console.log("--------------------------------------");
console.log("-- LineTracker Server               --");
console.log("-- Copyright (C) Felipe Durar 2025  --");
console.log("--------------------------------------");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Prisma issue with enableShutdownHooks
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  // Socket
  const configService = app.get(ConfigService);
  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Set up Swagger
  const config = new DocumentBuilder()
    //.addServer('/core')
    .setTitle('LineTracker Server')
    .setDescription('LineTracker Server<br>Copyright &copy; Felipe Durar 2025')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
