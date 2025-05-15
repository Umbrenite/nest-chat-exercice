import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);  
  }
  
  @Post('email/checkIfEmailExists')
  async checkIfEmailExists(@Body() body: CheckEmailDto): Promise<{ exists: boolean }> {    
    const user = await this.userService.checkIfEmailExists(body.email);    
    return { exists: !!user };
  }

  @Post('login')
  login(@Body() loginForm: {email: string, password: string}) {    
    return this.userService.login(loginForm.email, loginForm.password);  
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Get('group/:group_id')
  findByGroupId(@Param('group_id') group_id: string): Promise<User[] | null> {    
    return this.userService.findByGroupId(group_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
