import { Body, Controller, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';




@Controller('Ticket')
export class TicketsController {
  constructor(private readonly TicketsService: TicketsService) {}

}