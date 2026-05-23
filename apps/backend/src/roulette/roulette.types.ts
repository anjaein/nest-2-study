export interface RouletteItem {
  id: number;
  rewardType: 'gold' | 'gem';
  rewardAmount: number;
}

export interface RouletteSpin {
  id: number;
  userId: number;
  rewardType: 'gold' | 'gem';
  rewardAmount: number;
  spinnedAt: Date;
}

export interface SpinResult {
  rewardType: 'gold' | 'gem';
  rewardAmount: number;
}
