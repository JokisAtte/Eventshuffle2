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
  @MaxLength(100)
  name: string;

  @ArrayNotEmpty()
  @ArrayMaxSize(30)
  dates: string[];
}
