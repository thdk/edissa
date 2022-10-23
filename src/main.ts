import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      abortOnError: false,
      cors: true,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      // removes all properties of a request’s body which are not in the DTO
      whitelist: true,
      // this property would allow us to transform properties, for instance, an integer to a string
      transform: true,
    }),
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
