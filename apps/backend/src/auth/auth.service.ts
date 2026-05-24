import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SwordsService } from '../swords/swords.service';
import { UsersService } from '../users/users.service';
import type { PublicUser } from '../users/users.types';
import { signAccessToken } from './access-token';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly swordsService: SwordsService,
  ) {}

  async register(registerDto: RegisterDto): Promise<PublicUser> {
    this.assertRegisterDto(registerDto);

    const user = await this.usersService.createUser(
      registerDto.email,
      registerDto.password,
      registerDto.nickname,
    );

    await this.swordsService.createStarterSword(user.id);

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    this.assertLoginDto(loginDto);

    const user = await this.usersService.validateCredentials(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    return {
      accessToken: signAccessToken({
        sub: user.id,
        email: user.email,
        nickname: user.nickname,
      }),
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
}
