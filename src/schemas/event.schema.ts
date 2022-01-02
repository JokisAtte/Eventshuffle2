import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  dates: string[];

  @Prop()
  votes: [{ date: string; votes: string[] }];
}

export const EventSchema = SchemaFactory.createForClass(Event);
