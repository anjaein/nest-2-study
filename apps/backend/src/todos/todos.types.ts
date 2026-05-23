export interface Todo {
  id: number;
  userId: number;
  title: string;
  scheduledTime: string | null;
  isCompleted: boolean;
  rewardGold: number | null;
  completedAt: Date | null;
  createdAt: Date;
}

export interface TodoResponse {
  id: number;
  title: string;
  scheduledTime: string | null;
  isCompleted: boolean;
  rewardGold: number | null;
  completedAt: Date | null;
  createdAt: Date;
}
