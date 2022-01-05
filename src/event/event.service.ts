import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEqual } from 'lodash';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/event/event.schema';
import { CreateEventDto } from './event.dto';

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

  private async _getEvent(id: string) {
    const result = await this.eventModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Event '${id}' not found.`);
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
        votes: createEventDto.dates.map((d) => ({ date: d, votes: [] })),
      });

      const result = await createdEvent.save();
      console.log(result);
      if (!result.isNew) {
        throw new BadRequestException(
          `Event name must be unique. Event '${result.name}' already exists.`,
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
      const result = await this._getEvent(id);
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
      const event = await this._getEvent(id);

      // Check if voted dates include event date, and if voter has already voted for that day
      event.votes.forEach((eventDate) => {
        if (
          newVotes.includes(eventDate.date) &&
          !eventDate.votes.includes(voterName)
        ) {
          eventDate.votes.push(voterName);
        }
      });
      //TODo: Selvitä ja korjaa ei tarvi ettii uusiks find by id kun on jo referenssi
      return this.eventModel
        .findByIdAndUpdate(id, event, { returnDocument: 'after' })
        .exec();
    } catch (error) {
      this.logger.error(error.message);
      return error;
    }
  }

  async getEventResult(id: string): Promise<EventResultInterface> {
    this.logger.log(`Fiding result of ${id}`);
    try {
      const event = await this._getEvent(id);
      const voters: string[] = [];

      // Find unique voters from each date
      event.votes.forEach(({ votes }) => {
        votes.forEach((voter) => {
          if (!voters.includes(voter)) voters.push(voter);
        });
      });
      voters.sort();
      // Find suitable dates that have all the unique voters
      const suitableDates = event.votes.filter(({ votes }) => {
        return isEqual(votes.sort(), voters);
      });

      return { id: event.id, name: event.name, suitableDates };
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
