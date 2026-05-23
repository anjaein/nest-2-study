import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RouletteController } from './roulette.controller';
import { RouletteService } from './roulette.service';
import { RouletteSpinRepository } from './repositories/roulette-spin.repository';
import { RouletteSpin } from './entities/roulette-spin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouletteSpin, RouletteSpinRepository]),
    UsersModule,
  ],
  controllers: [RouletteController],
  providers: [RouletteService],
})
export class RouletteModule {}
