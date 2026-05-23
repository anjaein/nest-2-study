import { Controller, Headers, Post } from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { RouletteService } from './roulette.service';

@Controller('roulette')
export class RouletteController {
  constructor(private readonly rouletteService: RouletteService) {}

  @Post('spin')
  spin(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.rouletteService.spin(userId);
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
