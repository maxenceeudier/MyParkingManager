import { Parking } from "../parking/parking.entity";
import { Ticket } from "src/tickets/tickets.entity";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from "./places.entity"
import { PlaceService } from './places.service';
import { PlaceController } from './places.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Parking, Place]),
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [TypeOrmModule, PlaceService],
})
export class PlaceModule {}