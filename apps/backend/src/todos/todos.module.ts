import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [UsersModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
