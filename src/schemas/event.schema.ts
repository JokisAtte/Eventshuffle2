import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop()
  dates: [];
}
