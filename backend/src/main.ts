import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://192.168.0.102:3000'); // Substitua pelo URL do seu aplicativo React Native
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  await app.listen(3000);
}

bootstrap();