export interface Quest {
  id: number;
  title: string;
  rewardGold: number;
  type: 'daily' | 'weekly';
}

export interface UserQuest {
  id: number;
  userId: number;
  questId: number;
  periodKey: string;
  isCompleted: boolean;
  claimedAt: Date | null;
  createdAt: Date;
}

export interface UserQuestResponse {
  id: number;
  questId: number;
  title: string;
  rewardGold: number;
  type: 'daily' | 'weekly';
  isCompleted: boolean;
  isClaimed: boolean;
}
