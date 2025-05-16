import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as  bcrypt from "bcrypt";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(userData: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findByGroupId(group_id: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(':group_id = ANY(user.group_ids)', { group_id })
      .getMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(+id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(+id);
  }
  
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }
    
    const user = await this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();

    if (!user) {
      return { success: false, message: 'User not found' };
    } else {    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { success: false, message: 'Invalid email or password' };
      }
  
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, message: 'Login successful', user: userWithoutPassword };
    }

  }

  async checkIfEmailExists(email: string) {    
    return await this.userRepository.findOneBy({ email });
  }
}
