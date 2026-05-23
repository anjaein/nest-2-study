import { Controller, Delete, Get, Headers } from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.usersService.getMyProfile(userId);
  }

  @Delete('me')
  deleteMe(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    this.usersService.deleteUser(userId);

    return { message: '탈퇴가 완료되었습니다.' };
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
