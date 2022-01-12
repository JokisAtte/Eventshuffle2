import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './event.controller';
import { EventsModule } from './event.module';
import { EventsService } from './event.service';

describe('EventController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventsModule],
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
