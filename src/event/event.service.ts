import { Injectable, Logger, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEqual } from 'lodash';
import { Model } from 'mongoose';
import { CreateEventDto } from './event.dto';
import { Event, EventDocument } from './event.schema';

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

  /**
   * finds event with given id from database
   * @param id
   * @returns event corresponding to the id parameter
   */
  private async _getEvent(id: string) {
    const result = await this.eventModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Event '${id}' not found.`);
    }
    this.logger.log(`Event '${result.name}' found`);
    return result;
  }

  private _handleError(error) {
    this.logger.error(error);
    throw error;
  }

  /**
   * Returns all events in database
   * @returns list of events
   */
  async getAllEvents(): Promise<EventDocument[]> {
    this.logger.log('Finding all events');
    try {
      const events = await this.eventModel.find().exec();
      this.logger.log(`Found ${events.length} events`);
      return events;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Creates new event and saves it to database
   * @param createEventDto
   * @returns Created event
   */
  async createEvent(createEventDto: CreateEventDto): Promise<EventDocument> {
    this.logger.log(`Creating new event : ${createEventDto.name}`);

    try {
      const createdEvent = new this.eventModel({
        name: createEventDto.name,
        dates: createEventDto.dates,
        votes: createEventDto.dates.map((d) => ({ date: d, votes: [] })),
      });

      const result = await createdEvent.save();
      this.logger.log(`Event id: ${result.id} created`);
      return result;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Finds one event
   * @param id
   * @returns event corresponding to the id parameter
   */
  async findEvent(id: string): Promise<EventDocument> {
    this.logger.log(`Finding event: ${id}...`);
    try {
      const result = await this._getEvent(id);
      return result;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Adds a vote to an event
   * @param id
   * @param voterName
   * @param newVotes
   * @returns updated event
   */
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
      return await event.save();
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Searches for dates that suit all voters
   * @param id
   * @returns Array of dates that suit all voters.
   * Empty Array if no votes are given, or there are no suitable dates
   */
  async getEventResult(@Param() id: string): Promise<EventResultInterface> {
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

      let suitableDates = [];
      if (voters.length > 0) {
        // Find suitable dates that have all the unique voters
        voters.sort();
        suitableDates = event.votes.filter(({ votes }) => {
          return isEqual(votes.sort(), voters);
        });
      }

      return { id: event.id, name: event.name, suitableDates };
    } catch (error) {
      this._handleError(error);
    }
  }
}
