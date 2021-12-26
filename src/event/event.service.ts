import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEqual } from 'lodash';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schemas/event.schema';
import { CreateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async getAllEvents(): Promise<EventDocument[]> {
    return await this.eventModel.find().exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventDocument> {
    const createdEvent = new this.eventModel({
      name: createEventDto.name,
      dates: createEventDto.dates,
      votes: createEventDto.dates.map((d) => {
        return { date: d, votes: [] };
      }),
      voters: [],
    });
    return createdEvent.save();
  }

  async findEvent(id: string): Promise<EventDocument> {
    return await this.eventModel.findById(id);
  }

  async addVote(
    id: string,
    voterName: string,
    newVotes: string[],
  ): Promise<EventDocument> {
    let event: EventDocument = await this.findEvent(id);
    event.votes.map((eventDate) => {
      if (
        newVotes.includes(eventDate.date) &&
        !eventDate.votes.includes(voterName)
      ) {
        eventDate.votes.push(voterName);
      }
    });
    return await this.eventModel
      .findByIdAndUpdate(id, event, { returnDocument: 'after' })
      .exec();
  }

  async getEventResult(id: string): Promise<{
    id: string;
    name: string;
    suitableDates: { date: string; votes: string[] }[];
  }> {
    const event: EventDocument = await this.findEvent(id);
    const voters: string[] = [];
    event.votes.forEach((vote) => {
      vote.votes.forEach((voter) => {
        if (!voters.includes(voter)) voters.push(voter);
      });
    });
    voters.sort();
    const suitableDates = event.votes.filter((date) => {
      return isEqual(date.votes.sort(), voters);
    });
    return { id: event.id, name: event.name, suitableDates: suitableDates };
  }
}
