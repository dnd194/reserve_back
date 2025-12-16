// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';

class LoginDto {
  email: string;
  password: string;
}

class RegisterDto {
  email: string;
  password: string;
  name: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(
      dto.email,
      dto.password,
      dto.name,
    );
    return { id: user.userId, email: user.email, name: user.name };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const { accessToken } = await this.authService.login(user);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      // secure: true, // https 환경에서 활성화
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      id: user.userId,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie('access_token');
    return { ok: true };
  }
}
