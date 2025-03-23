import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getUserById(@Req() request: Request & { userId: string }) {
    const { userId } = request;
    return this.usersService.getUserById(userId);
  }
}
