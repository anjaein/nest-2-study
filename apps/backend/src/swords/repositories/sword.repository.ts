import { EntityRepository, Repository } from 'typeorm';
import { Sword } from '../entities/sword.entity';

@EntityRepository(Sword)
export class SwordRepository extends Repository<Sword> {}
