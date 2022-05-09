import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './schemas/list.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly model: Model<ListDocument>,
  ) {}
  async findAll(): Promise<List[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<List> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateListDto): Promise<List> {
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateListDto): Promise<List> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<List> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
