import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RouletteSpin } from './entities/roulette-spin.entity';
import type { SpinResult } from './roulette.types';

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

  constructor(
    @InjectRepository(RouletteSpin)
    private readonly spinsRepository: Repository<RouletteSpin>,
    private readonly usersService: UsersService,
  ) {}

  async spin(userId: number): Promise<SpinResult> {
    const item = this.items[Math.floor(Math.random() * this.items.length)];

    await this.spinsRepository.save(
      this.spinsRepository.create({
        userId,
        rewardType: item.rewardType,
        rewardAmount: item.rewardAmount,
      }),
    );

    if (item.rewardType === 'gold') {
      await this.usersService.addGold(userId, item.rewardAmount);
    } else {
      await this.usersService.addGem(userId, item.rewardAmount);
    }

    return {
      rewardType: item.rewardType,
      rewardAmount: item.rewardAmount,
    };
  }
}
