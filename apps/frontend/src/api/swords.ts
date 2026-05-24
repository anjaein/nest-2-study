import { apiClient } from './client';

export interface Sword {
  id: number;
  name: string;
  rarity: 'legendary' | 'epic' | 'rare' | 'common';
  level: number;
  isEquipped: boolean;
  enhanceConfig: {
    successRate: number;
    costGold: number;
    costGem: number;
    failLevelPenalty: number;
  };
}

export interface EnhanceResult {
  isSuccess: boolean;
  fromLevel: number;
  toLevel: number;
  costGold: number;
  costGem: number;
}

export const swordsApi = {
  // GET /swords/:id — 검 상세 조회
  getOne: (id: number) =>
    apiClient<Sword>(`/swords/${id}`),

  // POST /swords/:id/enhance — 강화 시도
  enhance: (id: number) =>
    apiClient<EnhanceResult>(`/swords/${id}/enhance`, { data: {} }),
};
