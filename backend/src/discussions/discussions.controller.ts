import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Repository } from 'typeorm';
import { Discussion } from './entities/discussion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('discussions')
export class DiscussionsController {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
  ) {}
  // @Post()
  // create(@Body() createDiscussionDto: CreateDiscussionDto) {
  //   return this.discussionsService.create(createDiscussionDto);
  // }

  @Get()
  findAll(): Promise<Discussion[]> {
    return this.discussionRepository.find();
  }

  @Get(':id')
  findOne(id: number): Promise<Discussion | null> {
    return this.discussionRepository.findOneBy({ id });
  }

  // @Get()
  // findAll() {
  //   return this.discussionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.discussionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
  //   return this.discussionsService.update(+id, updateDiscussionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.discussionsService.remove(+id);
  // }
}
