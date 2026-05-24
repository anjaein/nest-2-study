import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwordsModule } from '../swords/swords.module';
import { UsersModule } from '../users/users.module';
import { EnhancementAttempt } from './entities/enhancement-attempt.entity';
import { EnhancementsController } from './enhancements.controller';
import { EnhancementsService } from './enhancements.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnhancementAttempt]),
    SwordsModule,
    UsersModule,
  ],
  controllers: [EnhancementsController],
  providers: [EnhancementsService],
})
export class EnhancementsModule {}
