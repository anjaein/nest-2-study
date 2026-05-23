import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { MyProfile, PublicUser, User } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private nextId = 1;

  createUser(email: string, password: string, nickname: string): PublicUser {
    const normalizedEmail = email.trim().toLowerCase();

    if (this.users.some((user) => user.email === normalizedEmail)) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const passwordSalt = randomBytes(16).toString('hex');
    const user: User = {
      id: this.nextId,
      email: normalizedEmail,
      passwordHash: this.hashPassword(password, passwordSalt),
      passwordSalt,
      nickname: nickname.trim(),
      gold: 0,
      gem: 0,
      createdAt: new Date(),
    };

    this.nextId += 1;
    this.users.push(user);

    return this.toPublicUser(user);
  }

  validateCredentials(email: string, password: string): PublicUser | null {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.users.find((candidate) => {
      if (candidate.email !== normalizedEmail) {
        return false;
      }

      return this.verifyPassword(password, candidate);
    });

    return user ? this.toPublicUser(user) : null;
  }

  findByEmail(email: string): PublicUser | null {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.users.find(
      (candidate) => candidate.email === normalizedEmail,
    );

    return user ? this.toPublicUser(user) : null;
  }

  getMyProfile(userId: number): MyProfile {
    const user = this.findUserById(userId);

    return {
      id: user.id,
      nickname: user.nickname,
      gold: user.gold,
      gem: user.gem,
    };
  }

  deleteUser(userId: number): void {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    this.users.splice(userIndex, 1);
  }

  addGold(userId: number, amount: number): void {
    const user = this.findUserById(userId);

    user.gold += amount;
  }

  addGem(userId: number, amount: number): void {
    const user = this.findUserById(userId);

    user.gem += amount;
  }

  private hashPassword(password: string, salt: string): string {
    return scryptSync(password, salt, 64).toString('hex');
  }

  private verifyPassword(password: string, user: User): boolean {
    const passwordHash = Buffer.from(
      this.hashPassword(password, user.passwordSalt),
      'hex',
    );
    const storedPasswordHash = Buffer.from(user.passwordHash, 'hex');

    return timingSafeEqual(passwordHash, storedPasswordHash);
  }

  private findUserById(userId: number): User {
    const user = this.users.find((candidate) => candidate.id === userId);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  private toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
