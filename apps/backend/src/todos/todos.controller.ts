import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { verifyAccessToken } from '../auth/access-token';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Headers('authorization') authorization?: string) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.todosService.findAll(userId);
  }

  @Post()
  create(
    @Headers('authorization') authorization: string | undefined,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.todosService.create(userId, createTodoDto);
  }

  @Patch(':id')
  update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.todosService.update(userId, id, updateTodoDto);
  }

  @Delete(':id')
  delete(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    this.todosService.delete(userId, id);

    return { message: '삭제되었습니다.' };
  }

  @Patch(':id/complete')
  complete(
    @Headers('authorization') authorization: string | undefined,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userId = this.getUserIdFromAuthorization(authorization);

    return this.todosService.complete(userId, id);
  }

  private getUserIdFromAuthorization(authorization?: string): number {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : '';

    return verifyAccessToken(accessToken).sub;
  }
}
