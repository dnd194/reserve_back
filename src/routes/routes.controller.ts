// src/routes/routes.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
  ) {}

  @Get()
  findAll() {
    return this.routesService.getAllRoutes();
  }

  @Get('/:id/trips') // ✅ :id로 맞추고
  findTripsByRoute(@Param('id', ParseIntPipe) id: number) { // ✅ 숫자로 변환
    return this.routesService.getTripsByRoute(id);
  }
}
