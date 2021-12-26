import {
  Body,
  Controller,
  Get,
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

  @Get('list')
  async findAll(): Promise<{ id: string; name: string }[]> {
    const events = await this.eventsService.getAllEvents();
    return events.map((e) => ({ id: e.id, name: e.name }));
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<{ id: string }> {
    const addedEvent = await this.eventsService.createEvent(createEventDto);
    return { id: addedEvent.id };
  }

  @Get(':id')
  async findEvent(@Param() params): Promise<EventDocument> {
    return await this.eventsService.findEvent(params.id);
  }

  @Post(':id/vote')
  async addVote(@Param() params, @Body() body): Promise<any> {
    console.log('AddVote kutsuttu idllä:', params.id);
    return await this.eventsService.addVote(params.id, body.name, body.votes);
  }

  @Get(':id/results')
  async getEventResult(@Param() params): Promise<any> {
    console.log('getEventResult kutsuttu idllä:', params.id);
    return await this.eventsService.getEventResult(params.id);
  }
}
