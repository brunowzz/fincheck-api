import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findByEmail(email);

    if (emailTaken) {
      throw new ConflictException('This e-mail already used');
    }

    const hashedPassword = await hash(password, 12);

    const categoriesArr = [
      { name: 'Salário', icon: 'travel', type: 'INCOME' },
      { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
      { name: 'Outro', icon: 'other', type: 'INCOME' },
      { name: 'Casa', icon: 'home', type: 'EXPENSE' },
      { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
      { name: 'Educação', icon: 'education', type: 'EXPENSE' },
      { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
      { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
      { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
      { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
      { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
    ];

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Category: { createMany: { data: categoriesArr } },
      },
    });

    return { name: user.name, email: user.email };
  }
}
