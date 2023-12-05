import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.userRepository.remove(user);
  }
}
