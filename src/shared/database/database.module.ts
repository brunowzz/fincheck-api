import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';

@Global()
@Module({
  providers: [PrismaService, UserRepository, CategoriesRepository],
  exports: [UserRepository, CategoriesRepository],
})
export class DatabaseModule {}
