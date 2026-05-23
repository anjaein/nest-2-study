export interface User {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  nickname: string;
  gold: number;
  gem: number;
  createdAt: Date;
}

export interface PublicUser {
  id: number;
  email: string;
  nickname: string;
}

export interface MyProfile {
  id: number;
  nickname: string;
  gold: number;
  gem: number;
}
