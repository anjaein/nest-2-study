import { Module } from '@nestjs/common';
import { SwordsModule } from '../swords/swords.module';
import { UsersModule } from '../users/users.module';
import { EnhancementsController } from './enhancements.controller';
import { EnhancementsService } from './enhancements.service';

@Module({
  imports: [SwordsModule, UsersModule],
  controllers: [EnhancementsController],
  providers: [EnhancementsService],
})
export class EnhancementsModule {}
