import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RouletteController } from './roulette.controller';
import { RouletteService } from './roulette.service';

@Module({
  imports: [UsersModule],
  controllers: [RouletteController],
  providers: [RouletteService],
})
export class RouletteModule {}
