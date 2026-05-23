export interface Sword {
  id: number;
  userId: number;
  name: string;
  rarity: string;
  level: number;
  isEquipped: boolean;
  createdAt: Date;
}

export interface SwordResponse {
  id: number;
  name: string;
  rarity: string;
  level: number;
  isEquipped: boolean;
  createdAt: Date;
}
