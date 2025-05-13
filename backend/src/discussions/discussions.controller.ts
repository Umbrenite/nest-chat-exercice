import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Discussion } from './entities/discussion.entity';

@Controller('discussions')
export class DiscussionsController {
  constructor(
    private discussionService: DiscussionsService,
  ) {}

  @Post()
  create(@Body() createDiscussionDto: CreateDiscussionDto) {
    return this.discussionService.create(createDiscussionDto);  
  }

  @Get()
  findAll(): Promise<Discussion[]> {
    return this.discussionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Discussion | null> {
    return this.discussionService.findOne(id);
  }

  @Get('group/:group_id')
  findByGroupId(@Param('group_id') group_id: string): Promise<Discussion[] | null> {    
    return this.discussionService.findByGroupId(group_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionService.update(+id, updateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionService.remove(+id);
  }
}
