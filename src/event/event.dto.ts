import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty()
  name: string;

  @ArrayNotEmpty()
  @ArrayMaxSize(30)
  @ApiProperty()
  dates: string[];
}
