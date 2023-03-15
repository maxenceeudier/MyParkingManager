import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Ticket } from "./tickets.entity";
import { Place } from "src/places/places.entity";
import { PlaceService } from "src/places/places.service";

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  /*async freePlace(id : string) : Promise<void>
  {
    const ticket = await this.ticketsRepository.findOneBy({id: id});
    if (!ticket) throw new NotFoundException('ticket not found');
    await this.placeService.updatePlace(ticket.place.id);
    ticket.leftAt = new Date();
    await this.ticketsRepository.save(ticket);
  }*/

}
