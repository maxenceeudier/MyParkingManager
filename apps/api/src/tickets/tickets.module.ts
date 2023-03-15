import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from "./tickets.entity"
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { User } from "../users/users.entity";
import { Place } from "src/places/places.entity";
import { UsersModule } from 'src/users/users.module';
import { PlaceModule } from 'src/places/places.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Place]),
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TypeOrmModule, TicketsService],
})
export class TicketsModule {}