import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../utils/customs/current-user.decorator';
import JwtAuthenticationGuard from '../utils/guards/jwt-auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@CurrentUser() user: User) {
    return user;
  }

  @Post('sign-up')
  signUp(@Body() signUpData: SignUpDto) {
    return this.usersService.signUp(signUpData);
  }

  @Post('sign-in')
  signIn(@Body() signInData: SignInDto) {
    return this.usersService.signIn(signInData);
  }

  @Get('verification')
  verifyUser(@Query() { verifyString }: { verifyString: string }) {
    return this.usersService.verifyUser(verifyString);
  }
}
