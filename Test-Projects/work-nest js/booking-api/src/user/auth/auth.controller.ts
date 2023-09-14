import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProductKeyDto, SignInDto, SignupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    const user = body;
    console.log(body);
    return this.authService.signup(body);
  }

  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('logout/:email')
  logout(@Param('email') email: string): string {
    this.authService.logout(email);
    return `User ${email} logged out successfully!`;
  }

  @Post('/key')
  productKey(@Body() { email }: ProductKeyDto) {
    return this.authService.generateProductKey(email);
  }
}
