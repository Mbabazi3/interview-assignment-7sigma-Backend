import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/authSigIn.dto';
import { Response } from 'express';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authSignInDto: AuthSignInDto, @Res() res: Response) {
    const user = await this.authService.findOne(
      authSignInDto.username,
      authSignInDto.password,
    );

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid Credentials' });
    }

    const jwtToken = await this.authService.generateJwtToken(user);

    return res.status(HttpStatus.OK).send({
      jwtToken: jwtToken,
      message: 'Login Successful',
    });
  }
}
