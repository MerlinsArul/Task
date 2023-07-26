import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProjectArchitectGuard } from 'src/auth.guard';
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
  // @UseGuards(ProjectArchitectGuard)
  async create(@Body() car: Car): Promise<Car> {
    return this.carService.create(car);
  }
  @Post('add-new-field-to-model')
  async addNewFieldToModel(@Body() fieldData: any): Promise<any> {
    const { fieldName, fieldConfig } = fieldData;
    await this.carService.addNewFieldToModel(fieldName, fieldConfig);
    return {
      message: `Field "${fieldName}" added to the Car model successfully`,
    };
  }
}
