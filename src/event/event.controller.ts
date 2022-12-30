import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './event.dto';
import { EventsService } from './event.service';

@ApiTags('event')
@Controller('/event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/list')
  @ApiOperation({ summary: 'Finds all events' })
  async findAll(): Promise<{ id: string; name: string }[]> {
    const events = await this.eventsService.getAllEvents();
    return events.map((e) => ({ id: e.id, name: e.name }));
  }

  @Post('/')
  @ApiOperation({ summary: 'Creates new event. Give date as \'YYYY-MM-DD\'' })
  async addEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<{ id: string }> {
    const createdEvent = await this.eventsService.createEvent(createEventDto);
    return { id: createdEvent.id };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Finds event by id' })
  async findEvent(@Param('id') id: string) {
    return this.eventsService.findEvent(id);
  }

  @Post('/:id/vote')
  @ApiOperation({ summary: 'Adds votes to event' })
  addVote(@Param('id') id: string, @Body() body) {
    return this.eventsService.addVote(id, body.name, body.votes);
  }

  @Get('/:id/results')
  @ApiOperation({ summary: 'Returns dates that suit all voters' })
  getEventResult(@Param('id') id: string) {
    return this.eventsService.getEventResult(id);
  }
}
