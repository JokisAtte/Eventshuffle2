import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/schemas/event.schema';
import { EventController } from './event.controller';
import { EventsService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    EventsService,
  ],
  controllers: [EventController],
  providers: [EventsService],
})
export class EventsModule {}
