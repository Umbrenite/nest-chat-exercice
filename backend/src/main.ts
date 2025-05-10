import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // ou '*' pour tout accepter
    credentials: true, // utile si tu envoies des cookies ou headers auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
