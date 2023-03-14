import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Parking } from "./parking.entity";
import { Place } from "src/places/places.entity";

export interface ParkingFront {
  numOfNiv: number,
  name: string,
  placeTotal: number,
  placeFree: number
}

export interface PlaceFront {
    id: string,
    niv: number,
    num: number,
    isFree: boolean
}


@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {
    this.createParkingsForDemo();
  }


  async createParkingsForDemo()
  {
    const parkings = await this.parkingRepository.find();
    if (!parkings.length)
    {
      const parkingsName = ["Annecy centre", "Seynod", "Cran Gevrier centre"];
      parkingsName.forEach(async (e, i) => {
        let parking = new Parking();
        parking.name = e;
        let placeNUmber = 1;
        let places : Place[] = [];
        for (let j = 0; j < i + 2; j++)
        {
          for (let k = 0; k < 10 * (3 - i); k++)
          {
            let place = new Place();
            place.niv = j + 1;
            place.num = placeNUmber++;
            place.parking = parking;
            places.push(place);
            await this.placeRepository.save(place);
          }
        }
        parking.places = places;
        await this.parkingRepository.save(parking);
      })
    }
  }

  async getParkingList() : Promise<ParkingFront[]>
  {
    const parking = await this.parkingRepository.find({
      relations : {
        places : true,
      }
    });
    if (!parking.length)
      throw new BadRequestException("parkings not find");
    
    return parking.map(e => {
      let numOfNiv = 0;
      let placeFree = 0;
      let placeTotal = 0;
      e.places.forEach(pl => {
        if (pl.niv > numOfNiv)
          numOfNiv = pl.niv;
        if (pl.isFree)
          placeFree++;
        placeTotal++;
      })
      return {name: e.name, numOfNiv: numOfNiv, placeFree: placeFree, placeTotal: placeTotal}
    });
  }

  async getPlaces(name : string) : Promise<PlaceFront[]>
  {
    const parking = await this.parkingRepository.findOne({
      relations: {
        places: true,
      },
      where: {
        name: name,
      }
    });
    if (!parking)
      throw new BadRequestException('parking not found');
    return parking.places.map(e => {
      return {
        id: e.id,
        niv: e.niv,
        num: e.num,
        isFree: e.isFree
      }
    });
  }
}