import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';
import { EventsController } from './event/event.controller';
import { EventsModule } from './event/event.module';

dotenvConfig();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), EventsModule],
  controllers: [EventsController],
  providers: [],
})
export class AppModule {}
