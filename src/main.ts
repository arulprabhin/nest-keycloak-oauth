import { NestFactory } from '@nestjs/core';
import { AppModule } from './Config/App';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });
  await app.listen(4000);
}

process.on('EADDRINUSE', () => {
  console.log('123455-----------');
});

bootstrap();
