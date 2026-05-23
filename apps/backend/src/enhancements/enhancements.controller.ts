import {
  Controller,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { EnhancementsService } from './enhancements.service';

@Controller('swords')
export class EnhancementsController {
  constructor(private readonly enhancementsService: EnhancementsService) {}

  @Post(':id/enhance')
  enhance(
    @Headers('authorization') authorization?: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.enhancementsService.enhance(userId, id);
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
