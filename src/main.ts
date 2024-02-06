import { NestFactory } from '@nestjs/core';
import { AppModule } from './Config/App';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {},
  );
  await app.listen(4000);
}

process.on('EADDRINUSE', () => {
  console.log('123455-----------');
});

bootstrap();
