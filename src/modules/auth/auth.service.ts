import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }
}
