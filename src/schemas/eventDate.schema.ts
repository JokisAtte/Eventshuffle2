import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';
import { Document } from 'mongoose';

export type EventDateDocument = EventDateSchema & Document;

@Schema()
export class EventDateSchema {
  @Prop({ required: true })
  date: string;

  @Prop()
  votes: [string];
}
