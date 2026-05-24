import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';
import type { Todo, TodoResponse } from './todos.types';

@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];
  private nextId = 1;

  constructor(private readonly usersService: UsersService) {}

  findAll(userId: number): TodoResponse[] {
    return this.todos
      .filter((todo) => todo.userId === userId)
      .map((todo) => this.toTodoResponse(todo));
  }

  create(userId: number, createTodoDto: CreateTodoDto): TodoResponse {
    this.assertTitle(createTodoDto.title);

    const todo: Todo = {
      id: this.nextId,
      userId,
      title: createTodoDto.title.trim(),
      scheduledTime: createTodoDto.scheduledTime ?? null,
      isCompleted: false,
      rewardGold: null,
      completedAt: null,
      createdAt: new Date(),
    };

    this.nextId += 1;
    this.todos.push(todo);

    return this.toTodoResponse(todo);
  }

  update(
    userId: number,
    todoId: number,
    updateTodoDto: UpdateTodoDto,
  ): TodoResponse {
    const todo = this.findTodoById(userId, todoId);

    if (updateTodoDto.title !== undefined) {
      this.assertTitle(updateTodoDto.title);
      todo.title = updateTodoDto.title.trim();
    }

    if (updateTodoDto.scheduledTime !== undefined) {
      todo.scheduledTime = updateTodoDto.scheduledTime;
    }

    return this.toTodoResponse(todo);
  }

  delete(userId: number, todoId: number): void {
    const todoIndex = this.todos.findIndex(
      (todo) => todo.userId === userId && todo.id === todoId,
    );

    if (todoIndex === -1) {
      throw new NotFoundException('할일을 찾을 수 없습니다.');
    }

    this.todos.splice(todoIndex, 1);
  }

  complete(userId: number, todoId: number): TodoResponse {
    const todo = this.findTodoById(userId, todoId);

    if (!todo.isCompleted) {
      const rewardGold = this.createTodoRewardGold();

      todo.isCompleted = true;
      todo.rewardGold = rewardGold;
      todo.completedAt = new Date();
      this.usersService.addGold(userId, rewardGold);
    }

    return this.toTodoResponse(todo);
  }

  private findTodoById(userId: number, todoId: number): Todo {
    const todo = this.todos.find(
      (candidate) => candidate.userId === userId && candidate.id === todoId,
    );

    if (!todo) {
      throw new NotFoundException('할일을 찾을 수 없습니다.');
    }

    return todo;
  }

  private createTodoRewardGold(): number {
    return Math.floor(Math.random() * 16) + 5;
  }

  private assertTitle(title: string): void {
    if (!title?.trim()) {
      throw new BadRequestException('title은 필수입니다.');
    }
  }

  private toTodoResponse(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      scheduledTime: todo.scheduledTime,
      isCompleted: todo.isCompleted,
      rewardGold: todo.rewardGold,
      completedAt: todo.completedAt,
      createdAt: todo.createdAt,
    };
  }
}
