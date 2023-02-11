import { User } from '../entities/user.entity';

export interface UserPayload {
  token: string;
  user: User;
}
