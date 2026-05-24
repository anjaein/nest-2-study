import {
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { SwordsService } from './swords.service';

@Controller('swords')
export class SwordsController {
  constructor(private readonly swordsService: SwordsService) {}

  @Get()
  findAll(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.swordsService.findAll(userId);
  }

  @Get(':id')
  findById(
    @Headers('authorization') authorization?: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.swordsService.findById(userId, id);
  }

  @Patch(':id/equip')
  equip(
    @Headers('authorization') authorization?: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.swordsService.equip(userId, id);
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
