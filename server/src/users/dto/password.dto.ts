import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class PasswordDto {
  @MinLength(6)
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  password: string;
}
