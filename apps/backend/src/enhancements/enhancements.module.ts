import { Module } from '@nestjs/common';
import { EnhancementsController } from './enhancements.controller';
import { EnhancementsService } from './enhancements.service';

@Module({
  controllers: [EnhancementsController],
  providers: [EnhancementsService],
})
export class EnhancementsModule {}
