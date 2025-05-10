import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Controller('groups')
export class GroupsController {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

    @Get()
    findAll(): Promise<Group[]> {
      return this.groupRepository.find();
    }
  
    @Get(':id')
    findOne(id: number): Promise<Group | null> {
      return this.groupRepository.findOneBy({ id });
    }
  // @Post()
  // create(@Body() createGroupDto: CreateGroupDto) {
  //   return this.groupsService.create(createGroupDto);
  // }

  // @Get()
  // findAll() {
  //   return this.groupsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupsService.update(+id, updateGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(+id);
  // }
}
