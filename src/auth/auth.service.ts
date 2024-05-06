import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';

interface User {
  username: string;
  password: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // private readonly users: User[] = this.readJsonFile();

  private users(): User[] {
    try {
      // Read the file synchronously
      const data = fs.readFileSync('./users.json', 'utf8');

      // Parse JSON content
      const jsonData = JSON.parse(data);

      return jsonData;
    } catch (err) {
      console.error('Error reading JSON file:', err);
      return [];
    }
  }

  async findOne(username: string, password: string) {
    return this.users().find(
      (user) => user.username === username && user.password === password,
    );
  }
  async generateJwtToken(user: User) {
    const payload = { sub: user.userId, username: user.username };

    return await this.jwtService.signAsync(payload);
  }
}
