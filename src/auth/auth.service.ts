import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  username: string;
  password: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users: User[] = [
    { userId: 1, username: 'user1', password: 'password1' },
    { userId: 1, username: 'user2', password: 'password2' },
  ];

  async findOne(username: string, password: string) {
    return this.users.find(
      (user) => user.username === username && user.password === password,
    );
  }
  async generateJwtToken(user: User) {
    // const user = await this.findOne(username);

    // if (user?.password !== password || !user) {
    //   throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    // }
    const payload = { sub: user.userId, username: user.username };

    return await this.jwtService.signAsync(payload);
  }
}
