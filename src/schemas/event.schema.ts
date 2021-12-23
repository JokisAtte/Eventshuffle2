import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dates: [{ date: string; votes?: string[] }];
}

export const EventSchema = SchemaFactory.createForClass(Event);
