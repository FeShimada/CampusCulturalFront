import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { EventsController } from './events.controller';
import * as express from 'express';

@Module({
  imports: [
    
  ],
  controllers: [AppController, EventsController], 
  providers: [PrismaService], 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.json())
      .forRoutes('*'); 
  }
}
