import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnhancementsService } from './enhancements.service';
import { SwordsService } from '../swords/swords.service';
import { UsersService } from '../users/users.service';
import { EnhancementAttempt } from './entities/enhancement-attempt.entity';
import type { SwordResponse } from '../swords/swords.types';
import type { MyProfile } from '../users/users.types';

describe('EnhancementsService', () => {
  let service: EnhancementsService;
  let swordsService: jest.Mocked<Pick<SwordsService, 'findById' | 'addLevel'>>;
  let usersService: jest.Mocked<Pick<UsersService, 'getMyProfile' | 'addGold'>>;
  let attemptsRepository: jest.Mocked<Pick<Repository<EnhancementAttempt>, 'create' | 'save'>>;

  const sword = (level: number): SwordResponse => ({
    id: 1,
    name: 'Excalibur',
    rarity: 'legendary',
    level,
    isEquipped: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  });

  const profile = (gold: number): MyProfile => ({
    id: 1,
    nickname: '기사',
    gold,
    gem: 0,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnhancementsService,
        {
          provide: getRepositoryToken(EnhancementAttempt),
          useValue: {
            create: jest.fn((attempt: Partial<EnhancementAttempt>) => attempt),
            save: jest.fn(),
          },
        },
        {
          provide: SwordsService,
          useValue: {
            findById: jest.fn(),
            addLevel: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getMyProfile: jest.fn(),
            addGold: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(EnhancementsService);
    swordsService = module.get(SwordsService);
    usersService = module.get(UsersService);
    attemptsRepository = module.get(getRepositoryToken(EnhancementAttempt));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('강화 성공 시 골드를 차감하고 검 레벨을 올린다', async () => {
    swordsService.findById.mockResolvedValue(sword(3));
    usersService.getMyProfile.mockResolvedValue(profile(1000));
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const result = await service.enhance(1, 1);

    expect(result).toEqual({
      success: true,
      swordLevel: 4,
      goldUsed: 250,
    });
    expect(usersService.addGold).toHaveBeenCalledWith(1, -250);
    expect(swordsService.addLevel).toHaveBeenCalledWith(1, 1);
    expect(attemptsRepository.save).toHaveBeenCalledWith({
      swordId: 1,
      userId: 1,
      targetLevel: 4,
      success: true,
    });
  });

  it('강화 실패 시 골드는 차감하지만 검 레벨은 올리지 않는다', async () => {
    swordsService.findById.mockResolvedValue(sword(4));
    usersService.getMyProfile.mockResolvedValue(profile(1000));
    jest.spyOn(Math, 'random').mockReturnValue(1);

    const result = await service.enhance(1, 1);

    expect(result).toEqual({
      success: false,
      swordLevel: 4,
      goldUsed: 300,
    });
    expect(usersService.addGold).toHaveBeenCalledWith(1, -300);
    expect(swordsService.addLevel).not.toHaveBeenCalled();
  });

  it('골드가 부족하면 BadRequestException을 던지고 골드를 차감하지 않는다', async () => {
    swordsService.findById.mockResolvedValue(sword(3));
    usersService.getMyProfile.mockResolvedValue(profile(199));

    await expect(service.enhance(1, 1)).rejects.toThrow(BadRequestException);
    expect(usersService.addGold).not.toHaveBeenCalled();
    expect(swordsService.addLevel).not.toHaveBeenCalled();
  });

  it('최대 레벨이면 BadRequestException을 던진다', async () => {
    swordsService.findById.mockResolvedValue(sword(30));

    await expect(service.enhance(1, 1)).rejects.toThrow(BadRequestException);
    expect(usersService.getMyProfile).not.toHaveBeenCalled();
  });
});
