import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../utils/customs/current-user.decorator';
import JwtAuthenticationGuard from '../utils/guards/jwt-auth.guard';
import { EmailDto } from './dto/email.dto';
import { PasswordDto } from './dto/password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
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

  @Post('reset-password')
  resetPassword(@Body() { email }: EmailDto) {
    return this.usersService.resetPassword(email);
  }

  @ApiQuery({ required: true, name: 'verifyString' })
  @Put('verification')
  verifyUser(@Query() { verifyString }: { verifyString: string }) {
    return this.usersService.verifyUser(verifyString);
  }

  @ApiQuery({ required: true, name: 'resetPasswordToken' })
  @Put('set-password')
  setPassword(
    @Query() { resetPasswordToken }: { resetPasswordToken: string },
    @Body() { password }: PasswordDto,
  ) {
    return this.usersService.setPassword(resetPasswordToken, password);
  }
}
