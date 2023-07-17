import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Car } from 'src/car.schema';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.carService.findAll();
  }

  @Post()
  async create(@Body() car: Car): Promise<Car> {
    return this.carService.create(car);
  }
}
