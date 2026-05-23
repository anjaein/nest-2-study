import {
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { QuestsService } from './quests.service';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get()
  findAll(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.questsService.findAll(userId);
  }

  @Post(':id/complete')
  complete(
    @Headers('authorization') authorization?: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.questsService.complete(userId, id);
  }

  @Post(':id/claim')
  claim(
    @Headers('authorization') authorization?: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.questsService.claim(userId, id);
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
