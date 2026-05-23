import { Injectable } from '@nestjs/common';

@Injectable()
export class SwordsService {
  private readonly swords: Array<{
    id: number;
    userId: number;
    name: string;
    rarity: string;
    level: number;
    isEquipped: boolean;
    createdAt: Date;
  }> = [];
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
}
