import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models';
import { CreateUserInput, GetUserInput, UpdateUserInput } from './dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.usersService.create(data);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('where') where: GetUserInput): Promise<User> {
    return this.usersService.findOne(where);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('where') where: GetUserInput,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(where, data);
  }

  @Mutation(() => User)
  async deleteUser(@Args('where') where: GetUserInput): Promise<User> {
    return this.usersService.delete(where);
  }
}
