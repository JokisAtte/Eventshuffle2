import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './event/event.controller';
import { EventsModule } from './event/event.module';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), EventsModule],
  controllers: [EventsController],
  providers: [],
})
export class AppModule {}
