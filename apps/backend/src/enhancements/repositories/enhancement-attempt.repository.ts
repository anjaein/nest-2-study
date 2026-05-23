import { EntityRepository, Repository } from 'typeorm';
import { EnhancementAttempt } from '../entities/enhancement-attempt.entity';

@EntityRepository(EnhancementAttempt)
export class EnhancementAttemptRepository extends Repository<EnhancementAttempt> {}
