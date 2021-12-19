import { Controller, Get } from '@nestjs/common';

@Controller('event')
export class EventController {
  @Get('list')
  findAll(): [any] {
    return ['Moro moro'];
  }
}
