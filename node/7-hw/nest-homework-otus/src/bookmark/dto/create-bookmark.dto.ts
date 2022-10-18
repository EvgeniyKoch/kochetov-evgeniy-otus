import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookmarkDto {
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(2550)
  @MinLength(10)
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
