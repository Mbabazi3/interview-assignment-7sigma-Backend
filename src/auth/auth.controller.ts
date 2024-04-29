import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './auth.validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.getUser(body.username, body.password);

    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Invalid credentials',
      });
    }
    return res.status(HttpStatus.OK).send({
      jwtToken: await this.authService.generateJwt(user),
      message: 'Login Successful',
    });
  }
}
