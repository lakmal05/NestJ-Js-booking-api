import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CatogryService } from './catogry.service';
import { updateCatogryDto, createCatogryDto } from './dto';
import { Request } from 'express';

@Controller('catogry')
export class CatogryController {
  constructor(private readonly catogryService: CatogryService) {}

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    console.log(body, 'request');

    // return this.catogryService.updateCatogry(id, body);
    return this.catogryService.updateCatogry(id, body);
  }

  @Get('')
  getHomes() {
    return this.catogryService.getCatogry();
  }

  @Post('')
  createCatogry(@Body() body: createCatogryDto, @Req() req: Request) {
    console.log("aaaaaaaa");

    const data = {
      catogry_name: 'cat',
    };
    return this.catogryService.createCatogry(data);
  }

  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.catogryService.deleteCatogry(id);
  }

  // @Put(':id')
  // updateCatogry(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() body: updateCatogryDto,
  // ) {
  //   return this.catogryService.updateCatogry(id, body);
  // }

  @Post('/userImage')
  saveImage(@Body('url') url: string) {
    return this.catogryService.saveImage(url);
  }

  @Get('/getColumns')
  getTableCoulmns() {
    console.log('res resived');
    return this.catogryService.getTableCoulmns();
  }
}
