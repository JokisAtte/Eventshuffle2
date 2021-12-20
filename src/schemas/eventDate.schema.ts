import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';
import { Document } from 'mongoose';

export type dateAndVotesDocument = EventDate & Document;

@Schema()
export class EventDate {
  @Prop({ required: true })
  date: string;

  @Prop()
  votes: [string];
}
