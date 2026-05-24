export interface EnhanceConfig {
  level: number;
  successRate: number;
  requiredGold: number;
}

export interface EnhancementAttempt {
  id: number;
  swordId: number;
  userId: number;
  targetLevel: number;
  success: boolean;
  attemptedAt: Date;
}

export interface EnhanceResult {
  success: boolean;
  swordLevel: number;
  goldUsed: number;
}
