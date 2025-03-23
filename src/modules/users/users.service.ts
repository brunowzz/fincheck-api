import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UserRepository) {}

  getUserById(id: string) {
    return this.usersRepo.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
