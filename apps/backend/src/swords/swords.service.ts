import { Injectable, NotFoundException } from '@nestjs/common';
import type { Sword, SwordResponse } from './swords.types';

@Injectable()
export class SwordsService {
  private readonly swords: Sword[] = [];
  private nextId = 1;

  createStarterSword(userId: number): void {
    this.swords.push({
      id: this.nextId,
      userId,
      name: 'Excalibur',
      rarity: 'legendary',
      level: 1,
      isEquipped: true,
      createdAt: new Date(),
    });

    this.nextId += 1;
  }

  findAll(userId: number): SwordResponse[] {
    return this.swords
      .filter((sword) => sword.userId === userId)
      .map((sword) => this.toSwordResponse(sword));
  }

  findById(userId: number, swordId: number): SwordResponse {
    const sword = this.findSwordById(userId, swordId);
    return this.toSwordResponse(sword);
  }

  equip(userId: number, swordId: number): SwordResponse {
    const sword = this.findSwordById(userId, swordId);

    const userSwords = this.swords.filter((s) => s.userId === userId);
    userSwords.forEach((s) => {
      s.isEquipped = false;
    });

    sword.isEquipped = true;

    return this.toSwordResponse(sword);
  }

  private findSwordById(userId: number, swordId: number): Sword {
    const sword = this.swords.find(
      (candidate) => candidate.userId === userId && candidate.id === swordId,
    );

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
