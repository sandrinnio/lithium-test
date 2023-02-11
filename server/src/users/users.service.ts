import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
}
