import { Body, Controller, Get, Patch, UseGuards, Param, Put, Post} from '@nestjs/common';
import { PlaceService } from './places.service';
import { Place } from './places.entity';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  
  @Post('/taken')
  takePlace(
    @Body() body : {placeId: string, userToken: string}
  ) : Promise<boolean> {
    return this.placeService.takePlace(body.placeId, body.userToken);
  }

  @Put('/free/:id')
  freePlace(
    @Param('id') id : string
  ) : Promise<void> {
    return this.placeService.freePlace(id);
  }
 
}