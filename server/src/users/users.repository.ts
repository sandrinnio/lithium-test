import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('wrong_credentials_provided');
    }
    return user;
  }

  async verifyUser(verifyString: string) {
    const user = await this.usersRepository.findOneBy({ verifyString });
    if (!user) {
      throw new NotFoundException('user_does_not_exist');
    }
    user.verified = true;
    user.verifyString = null;
    return this.usersRepository.save(user);
  }

  create(userData: User) {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }
}
