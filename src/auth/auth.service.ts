// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.userId, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  // 회원가입 예시 (원하면 분리해서 UsersService에 둬도 됨)
  async register(email: string, password: string, name: string) {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) {
      throw new UnauthorizedException('이미 가입된 이메일입니다.');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      email,
      password: hashed,
      name,
      role: 'USER',
    });

    return this.userRepo.save(user);
  }
}
