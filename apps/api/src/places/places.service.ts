import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Place } from "./places.entity";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async updatePlace(id : string) : Promise<void> {
    let place = await this.placeRepository.findOneBy({id: id});
    if (!place) throw new NotFoundException('place not found');
    place.isFree = !place.isFree;
    this.placeRepository.save(place);
  }
}
