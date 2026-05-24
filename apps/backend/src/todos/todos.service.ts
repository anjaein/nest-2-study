import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import type { CreateTodoDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import type { TodoResponse } from './todos.types';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<TodoResponse[]> {
    const todos = await this.todosRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return todos.map((todo) => this.toTodoResponse(todo));
  }

  async create(
    userId: number,
    createTodoDto: CreateTodoDto,
  ): Promise<TodoResponse> {
    this.assertTitle(createTodoDto.title);

    const todo = this.todosRepository.create({
      userId,
      title: createTodoDto.title.trim(),
      scheduledTime: createTodoDto.scheduledTime ?? null,
      isCompleted: false,
      rewardGold: null,
      completedAt: null,
    });

    await this.todosRepository.save(todo);

    return this.toTodoResponse(todo);
  }

  async update(
    userId: number,
    todoId: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoResponse> {
    const todo = await this.findTodoById(userId, todoId);

    if (updateTodoDto.title !== undefined) {
      this.assertTitle(updateTodoDto.title);
      todo.title = updateTodoDto.title.trim();
    }

    if (updateTodoDto.scheduledTime !== undefined) {
      todo.scheduledTime = updateTodoDto.scheduledTime;
    }

    await this.todosRepository.save(todo);

    return this.toTodoResponse(todo);
  }

  async delete(userId: number, todoId: number): Promise<void> {
    const result = await this.todosRepository.delete({ id: todoId, userId });

    if (!result.affected) {
      throw new NotFoundException('할일을 찾을 수 없습니다.');
    }
  }

  async complete(userId: number, todoId: number): Promise<TodoResponse> {
    const todo = await this.findTodoById(userId, todoId);

    if (!todo.isCompleted) {
      const rewardGold = this.createTodoRewardGold();

      todo.isCompleted = true;
      todo.rewardGold = rewardGold;
      todo.completedAt = new Date();
      await this.usersService.addGold(userId, rewardGold);
      await this.todosRepository.save(todo);
    }

    return this.toTodoResponse(todo);
  }

  private async findTodoById(userId: number, todoId: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({
      id: todoId,
      userId,
    });

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
