import { Put, Controller, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('ticket')
export class TicketsController {
  constructor(private readonly TicketsService: TicketsService) {}

  /*@Put('/:id')
  freePlace(
    @Param('id') id : string
  ) : Promise<void> {
    return this.TicketsService.freePlace(id);
  }*/
}