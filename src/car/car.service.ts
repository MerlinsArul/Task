import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/car.schema';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private carModel: Model<Car>) {}

  async findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async create(car: Car): Promise<Car> {
    const newCar = new this.carModel(car);
    return newCar.save();
  }
}
