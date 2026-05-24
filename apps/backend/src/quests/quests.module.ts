import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { QuestRepository } from './repositories/quest.repository';
import { UserQuestRepository } from './repositories/user-quest.repository';
import { Quest } from './entities/quest.entity';
import { UserQuest } from './entities/user-quest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quest, UserQuest, QuestRepository, UserQuestRepository]),
    UsersModule,
  ],
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule {}
