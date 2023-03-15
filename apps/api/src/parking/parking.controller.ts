import { Controller, Get, Param } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingFront } from './parking.service';
import { PlaceFront } from './parking.service';


@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get()
  getPakingList() : Promise<ParkingFront[]>
  {
    return this.parkingService.getParkingList();
  }

  @Get('/:name')
  getPlaces(
    @Param('name') name : string) : Promise<PlaceFront[]> {
      return this.parkingService.getPlaces(name);
  } 
}