import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  findEvent(@Param() params): any {
    console.log('findEvent kutsuttu idllä:', params.id);
  }

  @Post(':id/vote')
  addVote(@Param() params): any {
    console.log('AddVote kutsuttu idllä:', params.id);
  }

  @Get(':id/results')
  getEventResult(@Param() params): any {
    console.log('getEventResult kutsuttu idllä:', params.id);
  }
}
