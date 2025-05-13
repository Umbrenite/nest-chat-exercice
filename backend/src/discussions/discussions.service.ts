import { Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
  ) {}


  async create(createDiscussionDto: CreateDiscussionDto) {
    const discussion = this.discussionRepository.create(createDiscussionDto);
    return await this.discussionRepository.save(discussion);
    }

  findAll() {
    return this.discussionRepository.find();
  }

  findOne(id: number) {
    return this.discussionRepository.findOneBy({ id });
  }
  
  findByGroupId(group_id : string) {
    return this.discussionRepository.findBy({ group_id });
  }

  update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionRepository.update(+id, updateDiscussionDto);
  }

  remove(id: number) {
    return this.discussionRepository.delete(+id);
  }
}
