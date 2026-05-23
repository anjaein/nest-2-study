import { EntityRepository, Repository } from 'typeorm';
import { RouletteSpin } from '../entities/roulette-spin.entity';

@EntityRepository(RouletteSpin)
export class RouletteSpinRepository extends Repository<RouletteSpin> {}
