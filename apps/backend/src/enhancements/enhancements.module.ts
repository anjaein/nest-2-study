import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwordsModule } from '../swords/swords.module';
import { UsersModule } from '../users/users.module';
import { EnhancementsController } from './enhancements.controller';
import { EnhancementsService } from './enhancements.service';
import { EnhancementAttemptRepository } from './repositories/enhancement-attempt.repository';
import { EnhancementAttempt } from './entities/enhancement-attempt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnhancementAttempt, EnhancementAttemptRepository]),
    SwordsModule,
    UsersModule,
  ],
  controllers: [EnhancementsController],
  providers: [EnhancementsService],
})
export class EnhancementsModule {}
