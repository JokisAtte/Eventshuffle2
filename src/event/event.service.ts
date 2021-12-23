import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schemas/event.schema';
import { CreateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  getAllEvents() {
    return this.eventModel.find().exec();
  }

  async createEvent(createEventDto: CreateEventDto) {
    const createdEvent = new this.eventModel({
      name: createEventDto.name,
      dates: createEventDto.dates.map((d) => {
        return { date: d, votes: [] };
      }),
    });
    return createdEvent.save();
  }

  findEvent(id: string) {}

  getEventResult(id: string) {}
}
