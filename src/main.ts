import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './Core/App';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {},
  );

  const config = new DocumentBuilder()
    .setTitle('Wellspring Cyber platform API')
    .setDescription('API Server v2')
    .setVersion('2.0')
    .setTermsOfService('toc')
    .addServer('http://localhost:4000/', 'Local environment')
    .addServer('http:/10.4.0.22/', 'Staging')
    .addServer('http://10.4.0.14/', 'Production')
    .setContact(
      'Wellspring AI',
      'https://wellspring.ai',
      'info@wellspringsys.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, {
    customSiteTitle: 'Wellspring platform APIs',
  });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  process.on('EADDRINUSE', () => {
    console.log('123455-----------');
    app.close();
  });

  await app.listen(4000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();