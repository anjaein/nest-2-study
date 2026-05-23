import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { RouletteSpin, SpinResult } from './roulette.types';

@Injectable()
export class RouletteService {
  private readonly items = [
    { id: 1, rewardType: 'gold' as const, rewardAmount: 50 },
    { id: 2, rewardType: 'gold' as const, rewardAmount: 100 },
    { id: 3, rewardType: 'gold' as const, rewardAmount: 150 },
    { id: 4, rewardType: 'gold' as const, rewardAmount: 200 },
    { id: 5, rewardType: 'gem' as const, rewardAmount: 1 },
    { id: 6, rewardType: 'gem' as const, rewardAmount: 2 },
    { id: 7, rewardType: 'gem' as const, rewardAmount: 5 },
  ];

  private readonly spins: RouletteSpin[] = [];
  private nextId = 1;

  constructor(private readonly usersService: UsersService) {}

  spin(userId: number): SpinResult {
    const item = this.items[Math.floor(Math.random() * this.items.length)];

    this.spins.push({
      id: this.nextId,
      userId,
      rewardType: item.rewardType,
      rewardAmount: item.rewardAmount,
      spinnedAt: new Date(),
    });
    this.nextId += 1;

    if (item.rewardType === 'gold') {
      this.usersService.addGold(userId, item.rewardAmount);
    } else {
      this.usersService.addGem(userId, item.rewardAmount);
    }

    return {
      rewardType: item.rewardType,
      rewardAmount: item.rewardAmount,
    };
  }
}
