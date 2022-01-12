import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  name: string;

  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @ApiProperty()
  @IsString({ each: true })
  @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, { each: true })
  dates: string[];
}
