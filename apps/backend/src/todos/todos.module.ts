import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoRepository } from './repositories/todo.repository';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoRepository]), UsersModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
