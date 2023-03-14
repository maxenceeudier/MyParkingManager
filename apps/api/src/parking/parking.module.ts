import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from "./parking.entity"
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { Place } from 'src/places/places.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parking, Place]),
  ],
  providers: [ParkingService],
  controllers: [ParkingController],
  exports: [TypeOrmModule, ParkingService],
})
export class ParkingModule {}