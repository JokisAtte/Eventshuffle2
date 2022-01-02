import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEqual } from 'lodash';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/schemas/event.schema';
import { CreateEventDto } from './dto';

type EventResultInterface = {
  id: string;
  name: string;
  suitableDates: { date: string; votes: string[] }[];
};

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}
  private readonly logger = new Logger(EventsService.name);

  private async getEvent(id: string) {
    const result = await this.eventModel.findById(id).exec();
    if (!result) {
      throw new HttpException('Event not Found', HttpStatus.NOT_FOUND);
    }
    this.logger.log(`Event '${result.name}' found`);
    return result;
  }

  async getAllEvents(): Promise<EventDocument[]> {
    this.logger.log('Finding all events');
    try {
      const events = await this.eventModel.find().exec();
      this.logger.log(`Found ${events.length} events`);
      return events;
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventDocument> {
    this.logger.log(`Creating new event : ${createEventDto.name}`);
    try {
      const createdEvent = new this.eventModel({
        name: createEventDto.name,
        dates: createEventDto.dates,
        votes: createEventDto.dates.map((d) => {
          return { date: d, votes: [] };
        }),
      });
      const result = await createdEvent.save();
      if (!result.isNew) {
        throw new HttpException(
          `Event name must be unique. Event '${result.name}' already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      this.logger.log(`Event id: ${result.id} created`);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async findEvent(id: string): Promise<EventDocument | void> {
    this.logger.log(`Finding event: ${id}...`);
    try {
      const result = await this.getEvent(id);
      this.logger.log(`Event '${result.name}' found`);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async addVote(
    id: string,
    voterName: string,
    newVotes: string[],
  ): Promise<EventDocument> {
    this.logger.log(`Adding vote of voter ${voterName} to event ${id}`);
    try {
      const result = await this.getEvent(id);
      result.votes.map((eventDate) => {
        if (
          newVotes.includes(eventDate.date) &&
          !eventDate.votes.includes(voterName)
        ) {
          eventDate.votes.push(voterName);
        }
      });
      return await this.eventModel
        .findByIdAndUpdate(id, result, { returnDocument: 'after' })
        .exec();
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async getEventResult(id: string): Promise<EventResultInterface> {
    this.logger.log(`Fiding result of ${id}`);
    try {
      const result = await this.getEvent(id);
      const voters: string[] = [];
      result.votes.forEach((vote) => {
        vote.votes.forEach((voter) => {
          if (!voters.includes(voter)) voters.push(voter);
        });
      });
      voters.sort();
      const suitableDates = result.votes.filter((date) => {
        return isEqual(date.votes.sort(), voters);
      });
      return { id: result.id, name: result.name, suitableDates };
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
