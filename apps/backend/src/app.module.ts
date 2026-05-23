import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { EnhancementsModule } from './enhancements/enhancements.module';
import { QuestsModule } from './quests/quests.module';
import { RouletteModule } from './roulette/roulette.module';
import { SwordsModule } from './swords/swords.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UsersModule,
    TodosModule,
    QuestsModule,
    SwordsModule,
    EnhancementsModule,
    RouletteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
