import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
  ) {}

  async signUp(signUpData: SignUpDto) {
    try {
      const hashedPassowrd = await bcrypt.hash(signUpData.password, 10);
      const createdUser = await this.usersRepository.create({
        ...signUpData,
        email: signUpData.email.toLowerCase().trim(),
        password: hashedPassowrd,
      });
      return createdUser;
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
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return { user, token };
  }

  private async validatePassword(hashedPassword: string, password: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('wrong_credentials_provided');
    }
  }
}
