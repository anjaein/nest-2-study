import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RouletteSpin } from './entities/roulette-spin.entity';
import { RouletteController } from './roulette.controller';
import { RouletteService } from './roulette.service';

@Module({
  imports: [TypeOrmModule.forFeature([RouletteSpin]), UsersModule],
  controllers: [RouletteController],
  providers: [RouletteService],
})
export class RouletteModule {}
