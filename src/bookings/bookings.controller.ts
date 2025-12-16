import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import UpdateBookingDto from './dto/create-booking-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Book } from './entities/book.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  updateBooking(
    @CurrentUser() user: User,
    @Body() updateBookingDto: UpdateBookingDto): Promise<any> {
    return this.bookingsService.updateBooking(user, updateBookingDto);
  }

  @Post("me")
  @UseGuards(JwtAuthGuard)
  myBookings(@CurrentUser() user: User): Promise<Book[]> {
    return this.bookingsService.getUserBookings(user);
  }

  @Delete(":bookId")
  @UseGuards(JwtAuthGuard)
  cancelBooking(
    @CurrentUser() user: User,
    @Body("bookId") bookId: number): Promise<any> {
    return this.bookingsService.cancelBooking(user, bookId);
  }
}
