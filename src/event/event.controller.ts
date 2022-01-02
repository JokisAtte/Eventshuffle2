import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventDocument } from 'src/schemas/event.schema';
import { CreateEventDto } from './dto';
import { EventsService } from './event.service';

@Controller('/api/v1/event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  private readonly logger = new Logger(EventsService.name);

  @Get('list')
  async findAll(): Promise<{ id: string; name: string }[]> {
    this.logger.log(`EventController.findAll called`);
    const events = await this.eventsService.getAllEvents();
    return events.map((e) => ({ id: e.id, name: e.name }));
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<{ id: string }> {
    this.logger.log(
      `EventController.addEvent called for event ${createEventDto.name}`,
    );
    const addedEvent = await this.eventsService.createEvent(createEventDto);
    return { id: addedEvent.id };
  }

  @Get(':id')
  async findEvent(@Param() params): Promise<EventDocument | void> {
    this.logger.log(`EventController.findEvent called with id: ${params.id}`);
    return await this.eventsService.findEvent(params.id);
  }

  @Post(':id/vote')
  async addVote(@Param() params, @Body() body): Promise<EventDocument | void> {
    this.logger.log(`EventController.addVote called with id: ${params.id}`);
    return await this.eventsService.addVote(params.id, body.name, body.votes);
  }

  @Get(':id/results')
  async getEventResult(@Param() params): Promise<{
    id: string;
    name: string;
    suitableDates: { date: string; votes: string[] }[];
  } | void> {
    this.logger.log(
      `EventController.getEventResult called with id: ${params.id}`,
    );
    return await this.eventsService.getEventResult(params.id);
  }
}
