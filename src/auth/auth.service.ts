import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

interface User {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  async getUser(username: string, password: string) {
    return this.users.find(
      (user) => user.username === username && user.password === password,
    );
  }

  async generateJwt(user: User) {
    return sign(user, process.env.SECRET_KEY);
  }
}
