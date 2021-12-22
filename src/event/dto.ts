import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsDateString,
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
  @IsDateString({ strict: false })
  @IsDateString({ each: true })
  dates: string[];
}
