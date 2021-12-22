import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto';

@Injectable()
export class EventsService {
  getAllEvents() {
    return ['Moro moro'];
  }

  async insertEvent(createEventDto: CreateEventDto) {
    console.log(createEventDto);
  }

  findEvent(id: string) {}

  getEventResult(id: string) {}
}
