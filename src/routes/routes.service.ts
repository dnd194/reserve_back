import { Injectable } from '@nestjs/common';
import { Route } from './entities/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/entities/trip.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepo: Repository<Route>,
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
  ) {}

  async getAllRoutes() {
    // 여기에 실제 데이터베이스 조회 로직 추가
    const routes = await this.routeRepo.find();
    console.log('Fetched routes:', routes);

    if (routes && routes.length > 0) {
      return routes;
    }
    console.log('No routes found in the database.');
    return [];
  }

  async getTripsByRoute(id: number): Promise<Trip[]> {
    console.log(`Fetching route with id: ${id}`);
    const route = await this.tripRepo.find({
      where: { routeId: id },
      order: { departureAt: 'ASC' },
    });

    console.log(`Fetched route for id ${id}:`, route);
    if (!route) {
      throw new Error(`Route with id ${id} not found`);
    }
    return route;
  }
}
