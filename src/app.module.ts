// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/ormconfig';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './routes/routes.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    RoutesModule,
    BookingsModule,
  ],
})
export class AppModule {}
