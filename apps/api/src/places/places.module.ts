import { Parking } from "../parking/parking.entity";
import { Ticket } from "src/tickets/tickets.entity";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from "./places.entity"
import { PlaceService } from './places.service';
import { PlaceController } from './places.controller';
import { User } from "src/users/users.entity";
import { TicketsModule } from "src/tickets/tickets.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Parking, Place, User]),
    TicketsModule,
    UsersModule
  ],
  providers: [PlaceService],
  controllers: [PlaceController],
  exports: [TypeOrmModule, PlaceService],
})
export class PlaceModule {}