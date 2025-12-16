import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Trip } from 'src/trips/entities/trip.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Route]),
      TypeOrmModule.forFeature([Trip])
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
