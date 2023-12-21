import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  const corsOption = {
    origin: '*',
    allowedHeaders: '*',
    credentials: true,
  };
  app.enableCors(corsOption);

  await app.listen(3000);
}
bootstrap();
