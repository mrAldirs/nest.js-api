import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);

    return await this.todoRepository.save(todo);
  }

  findMany() {
    return this.todoRepository.find();
  }

  findOne(id: string) {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    Object.assign(todo, dto);

    return await this.todoRepository.save(todo);
  }

  async delete(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });

    return await this.todoRepository.remove(todo);
  }
}
