import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from 'src/car.schema';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])],
  controllers: [CarController],
  providers: [CarService, JwtService],
  exports: [CarService, MongooseModule],
})
export class CarModule {}
