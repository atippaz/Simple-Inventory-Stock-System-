import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);
      if (user && compare(password, user.user_password)) {
        return {
          email: user.user_email,
          userId: user.user_id,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const access_token = this.jwtService.sign(payload, {
      privateKey: env.JWT_SECRET,
    });
    return {
      access_token,
    };
  }
}
