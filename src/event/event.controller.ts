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
export class EventController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('list')
  findAll(): string[] {
    return this.eventsService.getAllEvents();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  addEvent(@Body() createEventDto: CreateEventDto): { id: string } {
    this.eventsService.insertEvent(createEventDto);
    return { id: 'Placeholder' };
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
