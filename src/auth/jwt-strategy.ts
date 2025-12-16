// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'config';

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

const jwtConfig = config.get<{ secret: string }>('jwt');
console.log('JWT Secret:', jwtConfig.secret);
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1) Authorization 헤더
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 2) 쿠키에서
        (req) => req?.cookies?.['access_token'],
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret || 'dev-secret',
    });
  }

  async validate(payload: JwtPayload) {
    // request.user 로 들어감
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
