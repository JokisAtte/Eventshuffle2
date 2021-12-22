import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event/event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './event/event.module';
import { EventsService } from './event/event.service';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [EventController],
  providers: [AppService, EventsService],
})
export class AppModule {}
