import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import type { MyProfile, PublicUser } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    nickname: string,
  ): Promise<PublicUser> {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await this.usersRepository.findOneBy({
      email: normalizedEmail,
    });

    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const passwordSalt = randomBytes(16).toString('hex');
    const user = this.usersRepository.create({
      email: normalizedEmail,
      passwordHash: this.hashPassword(password, passwordSalt),
      passwordSalt,
      nickname: nickname.trim(),
      gold: 0,
      gem: 0,
    });

    await this.usersRepository.save(user);

    return this.toPublicUser(user);
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<PublicUser | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersRepository.findOneBy({
      email: normalizedEmail,
    });

    if (!user || !this.verifyPassword(password, user)) {
      return null;
    }

    return this.toPublicUser(user);
  }

  async findByEmail(email: string): Promise<PublicUser | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersRepository.findOneBy({
      email: normalizedEmail,
    });

    return user ? this.toPublicUser(user) : null;
  }

  async getMyProfile(userId: number): Promise<MyProfile> {
    const user = await this.findUserById(userId);

    return {
      id: user.id,
      nickname: user.nickname,
      gold: user.gold,
      gem: user.gem,
    };
  }

  async deleteUser(userId: number): Promise<void> {
    const result = await this.usersRepository.delete({ id: userId });

    if (!result.affected) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
  }

  async addGold(userId: number, amount: number): Promise<void> {
    const user = await this.findUserById(userId);

    user.gold += amount;
    await this.usersRepository.save(user);
  }

  async addGem(userId: number, amount: number): Promise<void> {
    const user = await this.findUserById(userId);

    user.gem += amount;
    await this.usersRepository.save(user);
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

  private async findUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });

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
