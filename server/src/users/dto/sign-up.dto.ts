import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  password: string;
}
