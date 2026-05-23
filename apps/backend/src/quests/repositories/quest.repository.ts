import { EntityRepository, Repository } from 'typeorm';
import { Quest } from '../entities/quest.entity';

@EntityRepository(Quest)
export class QuestRepository extends Repository<Quest> {}
