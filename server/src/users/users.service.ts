import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { generateRandomString } from '../utils/generate-random-string';
import { SendgridService } from '../utils/sendgrid/sendgrid.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserPayload } from './interfaces/user-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly sendgridService: SendgridService,
  ) {}

  async signUp(signUpData: SignUpDto) {
    try {
      const hashedPassowrd = await bcrypt.hash(signUpData.password, 10);
      const verifyString = await generateRandomString();
      const createdUser = await this.usersRepository.create({
        ...signUpData,
        verifyString,
        email: signUpData.email.toLowerCase().trim(),
        password: hashedPassowrd,
      });
      this.sendgridService.sendVerificationMail(
        createdUser.email,
        createdUser.verifyString,
      );
      return 'verification_mail_was_sent';
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('user_with_this_email_is_already_exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async signIn(signInData: SignInDto): Promise<UserPayload> {
    const { email, password } = signInData;
    const user = await this.usersRepository.getByEmail(
      email.toLowerCase().trim(),
    );
    await this.validatePassword(user.password, password);
    if (!user.verified) {
      throw new ForbiddenException('user_not_verified');
    }
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { user, token };
  }

  async verifyUser(verifyString: string): Promise<UserPayload> {
    const user = await this.usersRepository.verifyUser(verifyString);
    const payload: TokenPayload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { user, token };
  }

  async resetPassword(email: string) {
    const resetPasswordToken = await generateRandomString();
    const user = await this.usersRepository.resetPassword(
      email.toLowerCase().trim(),
      resetPasswordToken,
    );
    this.sendgridService.sendResetPasswordMail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      user.resetPasswordToken,
    );
  }

  async setPassword(resetPasswordToken: string, password: string) {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    return this.usersRepository.verifyResetPasswordToken(
      resetPasswordToken,
      hashedPassowrd,
    );
  }

  private async validatePassword(hashedPassword: string, password: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('wrong_credentials_provided');
    }
  }
}
