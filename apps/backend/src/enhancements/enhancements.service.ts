import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SwordsService } from '../swords/swords.service';
import { UsersService } from '../users/users.service';
import { EnhancementAttempt } from './entities/enhancement-attempt.entity';
import type { EnhanceResult } from './enhancements.types';

@Injectable()
export class EnhancementsService {
  private readonly enhanceConfigs = [
    { level: 1, successRate: 1.0, requiredGold: 100 },
    { level: 2, successRate: 0.95, requiredGold: 150 },
    { level: 3, successRate: 0.9, requiredGold: 200 },
    { level: 4, successRate: 0.85, requiredGold: 250 },
    { level: 5, successRate: 0.8, requiredGold: 300 },
    { level: 6, successRate: 0.7, requiredGold: 400 },
    { level: 7, successRate: 0.6, requiredGold: 500 },
    { level: 8, successRate: 0.5, requiredGold: 600 },
    { level: 9, successRate: 0.4, requiredGold: 700 },
    { level: 10, successRate: 0.3, requiredGold: 800 },
  ];

  private maxLevel = 30;

  constructor(
    @InjectRepository(EnhancementAttempt)
    private readonly attemptsRepository: Repository<EnhancementAttempt>,
    private readonly swordsService: SwordsService,
    private readonly usersService: UsersService,
  ) {}

  async enhance(userId: number, swordId: number): Promise<EnhanceResult> {
    const sword = await this.swordsService.findById(userId, swordId);

    if (sword.level >= this.maxLevel) {
      throw new BadRequestException('더 이상 강화할 수 없습니다.');
    }

    const targetLevel = sword.level + 1;
    const config = this.getEnhanceConfig(targetLevel);

    const userProfile = await this.usersService.getMyProfile(userId);
    if (userProfile.gold < config.requiredGold) {
      throw new BadRequestException('골드가 부족합니다.');
    }

    const success = Math.random() < config.successRate;

    await this.attemptsRepository.save(
      this.attemptsRepository.create({
        swordId,
        userId,
        targetLevel,
        success,
      }),
    );

    await this.usersService.addGold(userId, -config.requiredGold);

    if (success) {
      await this.swordsService.addLevel(userId, swordId);
    }

    return {
      success,
      swordLevel: success ? targetLevel : sword.level,
      goldUsed: config.requiredGold,
    };
  }

  private getEnhanceConfig(level: number) {
    const config = this.enhanceConfigs.find((c) => c.level === level);

    if (!config) {
      throw new NotFoundException('강화 설정을 찾을 수 없습니다.');
    }

    return config;
  }
}
