import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trips/entities/trip.entity';
import { Book } from './entities/book.entity';
@Module({
  imports: [
      TypeOrmModule.forFeature([Trip]),
      TypeOrmModule.forFeature([Book]),
    ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
