import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateEventDto } from './event.dto';
import { EventsService } from './event.service';

@Controller('/api/v1/event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  private readonly logger = new Logger(EventsService.name);

  @Get('/list')
  async findAll(): Promise<{ id: string; name: string }[]> {
    this.logger.log(`EventController.findAll called`);
    const events = await this.eventsService.getAllEvents();
    return events.map((e) => ({ id: e.id, name: e.name }));
  }

  @Post('/')
  async addEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<{ id: string }> {
    this.logger.log(
      `EventController.addEvent called for event ${createEventDto.name}`,
    );
    const createdEvent = await this.eventsService.createEvent(createEventDto);
    return { id: createdEvent.id };
  }

  @Get('/:id')
  findEvent(@Param() params) {
    this.logger.log(`EventController.findEvent called with id: ${params.id}`);
    return this.eventsService.findEvent(params.id);
  }

  @Post('/:id/vote')
  addVote(@Param() params: { id: string }, @Body() body) {
    this.logger.log(`EventController.addVote called with id: ${params.id}`);
    return this.eventsService.addVote(params.id, body.name, body.votes);
  }

  @Get('/:id/results')
  getEventResult(@Param() params: { id: string }) {
    this.logger.log(
      `EventController.getEventResult called with id: ${params.id}`,
    );
    return this.eventsService.getEventResult(params.id);
  }
}
