import { Repository } from 'typeorm';
import { Quest } from '../entities/quest.entity';

export class QuestRepository extends Repository<Quest> {}
