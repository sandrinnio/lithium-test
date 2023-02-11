import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class PasswordDto {
  @ApiProperty()
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  password: string;
}
