import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UpdateBookingDto from './dto/create-booking-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/entities/trip.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from './entities/book.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async updateBooking(
    user: User,
    updateBookingDto: UpdateBookingDto,
  ): Promise<any> {
    // 예약 생성 로직 구현
    console.log(`Creating booking for user ID: ${user.userId}`); // user.id -> user.userId로 수정
    console.log(updateBookingDto);

    // 기존 동일예약 확인 로직
    const exists = await this.bookRepo.findOne({
      where: {
        userId: user.userId,
        routeId: updateBookingDto.routeId,
        departureAt: updateBookingDto.departureAt,
      },
    });

    if (exists) {
      throw new ConflictException('이미 예약한 시간대 입니다.'); // status 409
    }

    const book = this.bookRepo.create({
      userId: user.userId,
      routeId: updateBookingDto.routeId,
      departureAt: updateBookingDto.departureAt,
    });

    await this.bookRepo.save(book);

    const trip = await this.tripRepo.findOne({
      where: {
        routeId: updateBookingDto.routeId,
        departureAt: updateBookingDto.departureAt,
      },
    });

    if (!trip) {
      throw new NotFoundException();
    }

    trip.bookedCount = trip.bookedCount + 1;

    await this.tripRepo.save(trip);

    return {
      message: `Booking created for trip ID: ${updateBookingDto.routeId}`,
    };
  }

  async getUserBookings(user: User): Promise<Book[]> {
    const books = await this.bookRepo
      .createQueryBuilder('book')
      .innerJoin(
        'trip',
        'trip',
        'trip.routeId = book.routeId and trip.departureAt = book.departureAt',
      )
      .innerJoin('route', 'route', 'route.routeId = book.routeId')
      .select([
        'book.bookId AS "bookId"',
        'book.routeId AS "routeId"',
        'book.departureAt AS "departureAt"',
        'route.name AS "routeName"',
        'route.description AS "routeDescription"',
        'trip.bookedCount AS "bookedCount"',
        'trip.maxSeats AS "maxSeats"',
      ])
      .orderBy('book.departureAt', 'ASC')
      .getRawMany(); // ✅ select에 alias 줬으면 raw로 받는 게 깔끔

    return books;
  }

  async cancelBooking(user: User, bookId: number): Promise<any> {
    const booking = await this.bookRepo.findOne({
      where: {
        bookId: bookId,
        userId: user.userId,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookRepo.remove(booking);

    const trip = await this.tripRepo.findOne({
      where: {
        routeId: booking.routeId,
        departureAt: booking.departureAt,
      },
    });

    if (trip) {
      trip.bookedCount = Math.max(0, trip.bookedCount - 1);
      await this.tripRepo.save(trip);
    }

    return { message: 'Booking cancelled successfully' };
  }
}