import { Controller } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('ticket')
export class TicketsController {
  constructor(private readonly TicketsService: TicketsService) {}
}