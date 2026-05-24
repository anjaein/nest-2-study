import { Module } from '@nestjs/common';
import { SwordsModule } from '../swords/swords.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, SwordsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
