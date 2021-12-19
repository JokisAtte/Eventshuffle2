import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event/event.controller';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule {}
