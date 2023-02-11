import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  signUp(@Body() signUpData: SignUpDto) {
    return this.usersService.signUp(signUpData);
  }

  @Post('sign-in')
  signIn(@Body() signInData: SignInDto) {
    return this.usersService.signIn(signInData);
  }
}
