import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { User, UserRepository } from './models';
import {
  CreateUserInput,
  GetUserInput,
  UpdateUserInput,
  ValidateUserInput,
} from './dto';
import { UserRoles, UserStatuses } from 'src/common';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserInput): Promise<User> {
    const userData = {
      ...data,
      password: await hash(data.password, 10),
      role: data.role ? data.role : UserRoles.CUSTOMER,
      status: data.status ? data.status : UserStatuses.PENDING,
    };
    return this.userRepository.create(userData);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(where: GetUserInput): Promise<User> {
    if (Object.keys(where).length === 0) {
      throw new BadRequestException(`User filter options aren't specified!`);
    }
    return this.userRepository.findOne(where);
  }

  async update(where: GetUserInput, data: UpdateUserInput): Promise<User> {
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await hash(updateData.password, 10);
    }
    return this.userRepository.updateOne(where, updateData);
  }

  delete(where: GetUserInput): Promise<User> {
    return this.userRepository.deleteOne(where);
  }

  async validate({ email, password }: ValidateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
