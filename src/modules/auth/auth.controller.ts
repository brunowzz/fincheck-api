import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.signIn(authenticateDto);
  }
}
