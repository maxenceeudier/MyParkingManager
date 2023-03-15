import { Body, Controller, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as CurrentUser } from '../common/decorators/user.decorator';
import { Ticket } from 'src/tickets/tickets.entity';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/tickets/:token')
  getTicket(
    @Param('token') token : string
  ) : Promise<Ticket[]> {
    return this.usersService.getTickets(token)
  }
}