import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

export const USERNAME_MAX_LENGTH = 50;
export const PASSWORD_MAX_LENGTH = 128;

@Injectable()
export class LegalService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async deleteAccount(username: string, password: string): Promise<void> {
    if (username.length > USERNAME_MAX_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const user = await this.authService.verifyCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    await this.usersService.remove(user.id);
  }
}
