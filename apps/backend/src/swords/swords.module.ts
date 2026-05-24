import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwordsController } from './swords.controller';
import { SwordsService } from './swords.service';
import { SwordRepository } from './repositories/sword.repository';
import { Sword } from './entities/sword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sword, SwordRepository])],
  controllers: [SwordsController],
  providers: [SwordsService],
  exports: [SwordsService],
})
export class SwordsModule {}
