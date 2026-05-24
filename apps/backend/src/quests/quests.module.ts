import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Quest } from './entities/quest.entity';
import { UserQuest } from './entities/user-quest.entity';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quest, UserQuest]), UsersModule],
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule {}
