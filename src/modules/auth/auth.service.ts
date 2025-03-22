import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UserRepository) {}

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

    return { isPasswordValid };
  }
}
