import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventDateSchema } from './eventDate.schema';

export type EventDocument = EventSchema & Document;

@Schema()
export class EventSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dates: [EventDateSchema];
}
