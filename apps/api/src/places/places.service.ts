import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "src/tickets/tickets.entity";
import { User } from "src/users/users.entity";
import { Repository } from 'typeorm';
import { Place } from "./places.entity";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async updatePlace(id: string) : Promise<Place> {
    let place = await this.placeRepository.findOneBy({id: id});
    if (!place) throw new NotFoundException('place not found');
    place.isFree = !place.isFree;
    this.placeRepository.save(place);
    return place;
  }

  async takePlace(placeId: string, userToken: string) : Promise<boolean>
  {
    const user = await this.userRepository.findOneBy({token: userToken});
    if (!user) throw new NotFoundException('user not found');
    const ticket = new Ticket();
    ticket.user = user;
    ticket.place = await this.updatePlace(placeId);
    ticket.arrivedAt = new Date();
    ticket.leftAt = null;
    await this.ticketRepository.save(ticket);
    return true;
  }

  async freePlace(id : string) : Promise<void>
  {
    const ticket = await this.ticketRepository.findOneBy({id: id});
    if (!ticket) throw new NotFoundException('ticket not found');
    ticket.place = await this.updatePlace(ticket.place.id);
    ticket.leftAt = new Date();
    await this.ticketRepository.save(ticket);
  }
}
