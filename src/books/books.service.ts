import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto) {
    const book = this.bookRepository.create(dto);

    return await this.bookRepository.save(book);
  }

  async findAll() {
    const books = await this.bookRepository.find({
      relations: ['user'],
    });
    return books;
  }

  async findOne(id: string) {
    return this.bookRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, dto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    Object.assign(book, dto, { id });

    return await this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.bookRepository.findOne({ where: { id } });

    return await this.bookRepository.remove(book);
  }
}
