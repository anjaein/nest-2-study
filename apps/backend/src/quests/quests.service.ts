import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { Quest, UserQuest, UserQuestResponse } from './quests.types';

@Injectable()
export class QuestsService {
  private readonly quests: Quest[] = [
    { id: 1, title: '10개 할일 완료하기', rewardGold: 100, type: 'daily' },
    { id: 2, title: '5번 강화 시도하기', rewardGold: 50, type: 'daily' },
    { id: 3, title: '매일 접속하기', rewardGold: 30, type: 'daily' },
    { id: 4, title: '50개 할일 완료하기', rewardGold: 500, type: 'weekly' },
    { id: 5, title: '검 강화 3회 성공하기', rewardGold: 200, type: 'weekly' },
  ];

  private readonly userQuests: UserQuest[] = [];
  private nextUserQuestId = 1;

  constructor(private readonly usersService: UsersService) {}

  findAll(userId: number): UserQuestResponse[] {
    const today = this.getTodayKey();
    const thisWeek = this.getWeekKey();

    this.ensureUserQuestsExist(userId, today, thisWeek);

    return this.userQuests
      .filter(
        (uq) =>
          uq.userId === userId &&
          (uq.periodKey === today || uq.periodKey === thisWeek),
      )
      .map((uq) => this.toUserQuestResponse(uq));
  }

  complete(userId: number, userQuestId: number): UserQuestResponse {
    const userQuest = this.findUserQuestById(userId, userQuestId);

    userQuest.isCompleted = true;

    return this.toUserQuestResponse(userQuest);
  }

  claim(userId: number, userQuestId: number): UserQuestResponse {
    const userQuest = this.findUserQuestById(userId, userQuestId);

    if (!userQuest.isCompleted) {
      throw new BadRequestException('완료되지 않은 퀘스트입니다.');
    }

    if (userQuest.claimedAt) {
      throw new BadRequestException('이미 수령한 퀘스트입니다.');
    }

    userQuest.claimedAt = new Date();

    const quest = this.getQuestById(userQuest.questId);
    this.usersService.addGold(userId, quest.rewardGold);

    return this.toUserQuestResponse(userQuest);
  }

  private ensureUserQuestsExist(
    userId: number,
    dailyKey: string,
    weeklyKey: string,
  ): void {
    const existingDailyQuestIds = this.userQuests
      .filter((uq) => uq.userId === userId && uq.periodKey === dailyKey)
      .map((uq) => uq.questId);

    const existingWeeklyQuestIds = this.userQuests
      .filter((uq) => uq.userId === userId && uq.periodKey === weeklyKey)
      .map((uq) => uq.questId);

    const dailyQuests = this.quests.filter((q) => q.type === 'daily');
    const weeklyQuests = this.quests.filter((q) => q.type === 'weekly');

    dailyQuests.forEach((quest) => {
      if (!existingDailyQuestIds.includes(quest.id)) {
        this.userQuests.push({
          id: this.nextUserQuestId,
          userId,
          questId: quest.id,
          periodKey: dailyKey,
          isCompleted: false,
          claimedAt: null,
          createdAt: new Date(),
        });
        this.nextUserQuestId += 1;
      }
    });

    weeklyQuests.forEach((quest) => {
      if (!existingWeeklyQuestIds.includes(quest.id)) {
        this.userQuests.push({
          id: this.nextUserQuestId,
          userId,
          questId: quest.id,
          periodKey: weeklyKey,
          isCompleted: false,
          claimedAt: null,
          createdAt: new Date(),
        });
        this.nextUserQuestId += 1;
      }
    });
  }

  private findUserQuestById(userId: number, userQuestId: number): UserQuest {
    const userQuest = this.userQuests.find(
      (uq) => uq.userId === userId && uq.id === userQuestId,
    );

    if (!userQuest) {
      throw new NotFoundException('퀘스트를 찾을 수 없습니다.');
    }

    return userQuest;
  }

  private getQuestById(questId: number): Quest {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest) {
      throw new NotFoundException('퀘스트 정의를 찾을 수 없습니다.');
    }

    return quest;
  }

  private toUserQuestResponse(userQuest: UserQuest): UserQuestResponse {
    const quest = this.getQuestById(userQuest.questId);

    return {
      id: userQuest.id,
      questId: userQuest.questId,
      title: quest.title,
      rewardGold: quest.rewardGold,
      type: quest.type,
      isCompleted: userQuest.isCompleted,
      isClaimed: userQuest.claimedAt !== null,
    };
  }

  private getTodayKey(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getWeekKey(): string {
    const today = new Date();
    const year = today.getFullYear();
    const week = this.getWeekNumber(today);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
