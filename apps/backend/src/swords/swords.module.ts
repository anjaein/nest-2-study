import { Module } from '@nestjs/common';
import { SwordsController } from './swords.controller';
import { SwordsService } from './swords.service';

@Module({
  controllers: [SwordsController],
  providers: [SwordsService],
  exports: [SwordsService],
})
export class SwordsModule {}
