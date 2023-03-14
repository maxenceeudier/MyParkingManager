import { Body, Controller, Get, Patch, UseGuards, Param, Put} from '@nestjs/common';
import { PlaceService } from './places.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Put('/update/:id')
  updatePlace(
    @Param('id') id : string) : Promise<void> {
      return this.placeService.updatePlace(id);
    }
}