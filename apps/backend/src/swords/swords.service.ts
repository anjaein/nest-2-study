import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sword } from './entities/sword.entity';
import type { SwordResponse } from './swords.types';

@Injectable()
export class SwordsService {
  constructor(
    @InjectRepository(Sword)
    private readonly swordsRepository: Repository<Sword>,
  ) {}

  async createStarterSword(userId: number): Promise<void> {
    const sword = this.swordsRepository.create({
      userId,
      name: 'Excalibur',
      rarity: 'legendary',
      level: 1,
      isEquipped: true,
    });

    await this.swordsRepository.save(sword);
  }

  async findAll(userId: number): Promise<SwordResponse[]> {
    const swords = await this.swordsRepository.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });

    return swords.map((sword) => this.toSwordResponse(sword));
  }

  async findById(userId: number, swordId: number): Promise<SwordResponse> {
    const sword = await this.findSwordById(userId, swordId);
    return this.toSwordResponse(sword);
  }

  async equip(userId: number, swordId: number): Promise<SwordResponse> {
    const sword = await this.findSwordById(userId, swordId);

    await this.swordsRepository.update({ userId }, { isEquipped: false });
    await this.swordsRepository.update(
      { id: sword.id, userId },
      { isEquipped: true },
    );

    return {
      ...this.toSwordResponse(sword),
      isEquipped: true,
    };
  }

  async addLevel(userId: number, swordId: number): Promise<void> {
    const sword = await this.findSwordById(userId, swordId);
    sword.level += 1;
    await this.swordsRepository.save(sword);
  }

  async setLevel(
    userId: number,
    swordId: number,
    level: number,
  ): Promise<void> {
    const sword = await this.findSwordById(userId, swordId);
    sword.level = level;
    await this.swordsRepository.save(sword);
  }

  private async findSwordById(userId: number, swordId: number): Promise<Sword> {
    const sword = await this.swordsRepository.findOneBy({
      id: swordId,
      userId,
    });

    if (!sword) {
      throw new NotFoundException('검을 찾을 수 없습니다.');
    }

    return sword;
  }

  private toSwordResponse(sword: Sword): SwordResponse {
    return {
      id: sword.id,
      name: sword.name,
      rarity: sword.rarity,
      level: sword.level,
      isEquipped: sword.isEquipped,
      createdAt: sword.createdAt,
    };
  }
}
