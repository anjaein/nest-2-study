import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Quest } from './entities/quest.entity';
import { UserQuest } from './entities/user-quest.entity';
import type { UserQuestResponse } from './quests.types';

@Injectable()
export class QuestsService {
  private readonly defaultQuests = [
    { id: 1, title: '10개 할일 완료하기', rewardGold: 100, type: 'daily' },
    { id: 2, title: '5번 강화 시도하기', rewardGold: 50, type: 'daily' },
    { id: 3, title: '매일 접속하기', rewardGold: 30, type: 'daily' },
    { id: 4, title: '50개 할일 완료하기', rewardGold: 500, type: 'weekly' },
    { id: 5, title: '검 강화 3회 성공하기', rewardGold: 200, type: 'weekly' },
  ] satisfies Array<Pick<Quest, 'id' | 'title' | 'rewardGold' | 'type'>>;

  constructor(
    @InjectRepository(Quest)
    private readonly questsRepository: Repository<Quest>,
    @InjectRepository(UserQuest)
    private readonly userQuestsRepository: Repository<UserQuest>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<UserQuestResponse[]> {
    const today = this.getTodayKey();
    const thisWeek = this.getWeekKey();

    await this.ensureDefaultQuestsExist();
    await this.ensureUserQuestsExist(userId, today, thisWeek);

    const userQuests = await this.userQuestsRepository.find({
      where: [
        { userId, periodKey: today },
        { userId, periodKey: thisWeek },
      ],
      order: { id: 'ASC' },
    });

    return Promise.all(
      userQuests.map((userQuest) => this.toUserQuestResponse(userQuest)),
    );
  }

  async complete(
    userId: number,
    userQuestId: number,
  ): Promise<UserQuestResponse> {
    const userQuest = await this.findUserQuestById(userId, userQuestId);

    userQuest.isCompleted = true;
    await this.userQuestsRepository.save(userQuest);

    return this.toUserQuestResponse(userQuest);
  }

  async claim(userId: number, userQuestId: number): Promise<UserQuestResponse> {
    const userQuest = await this.findUserQuestById(userId, userQuestId);

    if (!userQuest.isCompleted) {
      throw new BadRequestException('완료되지 않은 퀘스트입니다.');
    }

    if (userQuest.claimedAt) {
      throw new BadRequestException('이미 수령한 퀘스트입니다.');
    }

    userQuest.claimedAt = new Date();
    await this.userQuestsRepository.save(userQuest);

    const quest = await this.getQuestById(userQuest.questId);
    await this.usersService.addGold(userId, quest.rewardGold);

    return this.toUserQuestResponse(userQuest);
  }

  private async ensureDefaultQuestsExist(): Promise<void> {
    const questCount = await this.questsRepository.count();

    if (questCount > 0) {
      return;
    }

    await this.questsRepository.save(
      this.defaultQuests.map((quest) => this.questsRepository.create(quest)),
    );
  }

  private async ensureUserQuestsExist(
    userId: number,
    dailyKey: string,
    weeklyKey: string,
  ): Promise<void> {
    const quests = await this.questsRepository.find();
    const existingUserQuests = await this.userQuestsRepository.find({
      where: [
        { userId, periodKey: dailyKey },
        { userId, periodKey: weeklyKey },
      ],
    });

    const existingKeys = new Set(
      existingUserQuests.map((uq) => `${uq.questId}:${uq.periodKey}`),
    );

    const userQuestsToCreate = quests
      .map((quest) => ({
        quest,
        periodKey: quest.type === 'daily' ? dailyKey : weeklyKey,
      }))
      .filter(
        ({ quest, periodKey }) => !existingKeys.has(`${quest.id}:${periodKey}`),
      )
      .map(({ quest, periodKey }) =>
        this.userQuestsRepository.create({
          userId,
          questId: quest.id,
          periodKey,
          isCompleted: false,
          claimedAt: null,
        }),
      );

    if (userQuestsToCreate.length > 0) {
      await this.userQuestsRepository.save(userQuestsToCreate);
    }
  }

  private async findUserQuestById(
    userId: number,
    userQuestId: number,
  ): Promise<UserQuest> {
    const userQuest = await this.userQuestsRepository.findOneBy({
      id: userQuestId,
      userId,
    });

    if (!userQuest) {
      throw new NotFoundException('퀘스트를 찾을 수 없습니다.');
    }

    return userQuest;
  }

  private async getQuestById(questId: number): Promise<Quest> {
    const quest = await this.questsRepository.findOneBy({ id: questId });

    if (!quest) {
      throw new NotFoundException('퀘스트 정의를 찾을 수 없습니다.');
    }

    return quest;
  }

  private async toUserQuestResponse(
    userQuest: UserQuest,
  ): Promise<UserQuestResponse> {
    const quest = await this.getQuestById(userQuest.questId);

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
