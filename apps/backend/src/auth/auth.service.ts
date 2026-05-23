import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { SwordsService } from '../swords/swords.service';
import { UsersService } from '../users/users.service';
import type { PublicUser } from '../users/users.types';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly swordsService: SwordsService,
  ) {}

  register(registerDto: RegisterDto): PublicUser {
    this.assertRegisterDto(registerDto);

    const user = this.usersService.createUser(
      registerDto.email,
      registerDto.password,
      registerDto.nickname,
    );

    this.swordsService.createStarterSword(user.id);

    return user;
  }

  login(loginDto: LoginDto): { accessToken: string } {
    this.assertLoginDto(loginDto);

    const user = this.usersService.validateCredentials(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return {
      accessToken: this.createAccessToken(user),
    };
  }

  private assertRegisterDto(registerDto: RegisterDto): void {
    if (
      !registerDto?.email?.trim() ||
      !registerDto?.password?.trim() ||
      !registerDto?.nickname?.trim()
    ) {
      throw new BadRequestException('email, password, nickname은 필수입니다.');
    }
  }

  private assertLoginDto(loginDto: LoginDto): void {
    if (!loginDto?.email?.trim() || !loginDto?.password?.trim()) {
      throw new BadRequestException('email, password는 필수입니다.');
    }
  }

  private createAccessToken(user: PublicUser): string {
    const header = this.base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
    const payload = this.base64UrlEncode({
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
    });
    const signature = createHmac('sha256', 'sword-task-dev-secret')
      .update(`${header}.${payload}`)
      .digest('base64url');

    return `${header}.${payload}.${signature}`;
  }

  private base64UrlEncode(value: object): string {
    return Buffer.from(JSON.stringify(value)).toString('base64url');
  }
}
