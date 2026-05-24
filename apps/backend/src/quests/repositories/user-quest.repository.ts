import { EntityRepository, Repository } from 'typeorm';
import { UserQuest } from '../entities/user-quest.entity';

@EntityRepository(UserQuest)
export class UserQuestRepository extends Repository<UserQuest> {}
