import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from "./tickets.entity"
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TypeOrmModule, TicketsService],
})
export class TicketsModule {}