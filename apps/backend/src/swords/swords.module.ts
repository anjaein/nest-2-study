import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sword } from './entities/sword.entity';
import { SwordsController } from './swords.controller';
import { SwordsService } from './swords.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sword])],
  controllers: [SwordsController],
  providers: [SwordsService],
  exports: [SwordsService],
})
export class SwordsModule {}
