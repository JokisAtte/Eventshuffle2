import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from './event.dto';
import { EventsService } from './event.service';

@Controller('/event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/list')
  async findAll(): Promise<{ id: string; name: string }[]> {
    const events = await this.eventsService.getAllEvents();
    return events.map((e) => ({ id: e.id, name: e.name }));
  }

  @Post('/')
  async addEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<{ id: string }> {
    const createdEvent = await this.eventsService.createEvent(createEventDto);
    return { id: createdEvent.id };
  }

  @Get('/:id')
  async findEvent(@Param() params) {
    return this.eventsService.findEvent(params.id);
  }

  @Post('/:id/vote')
  addVote(@Param() params: { id: string }, @Body() body) {
    return this.eventsService.addVote(params.id, body.name, body.votes);
  }

  @Get('/:id/results')
  getEventResult(@Param() params: { id: string }) {
    return this.eventsService.getEventResult(params.id);
  }
}
