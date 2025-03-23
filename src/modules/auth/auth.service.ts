import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDto, SignUpDto } from './dto/authenticate.dto';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Injectable()
@IsPublic()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }

  async signIn(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signUp(createUserDto: SignUpDto) {
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

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }
}
