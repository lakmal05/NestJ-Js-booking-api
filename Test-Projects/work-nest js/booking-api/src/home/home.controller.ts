import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  ParseIntPipe,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { HomeService } from './home.service';
import {
  CreateHomeDto,
  HomeResponseDto,
  saveImageDto,
  updateHomeDto,
} from './dto/home.dto';
import { User } from 'src/user/decorators/user.decorators';

import { UserType } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { userInfo } from 'os';

export interface UserInfo {
  email: string;
  id: number;
  iat: number;
  exp: number;
}

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('')
  getHomes(
    @Query('address') address?: string,
    @Query('city') city?: string,
    @Query('prpertyType') propertyType?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(minPrice) }),
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      ...(price && { price }),
    };
    console.log(filters);
    //  const A = 'DATA FETCHED';
    //   return  A;
    return this.homeService.getHomes(filters);
  }

  @Get(':id')
  getHome() {
    return 'id';
  }

  @Roles(UserType.ADMIN, UserType.BUYER)
  // @Roles(UserType.BUYER)
  @UseGuards(AuthGuard)
  @Post('create')
  createHome(@Body() body: CreateHomeDto, @User() user: UserInfo) {
    return this.homeService.createHome(body, user.id);
  }

  @Put(':id')
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateHomeDto,
  ) {
    return this.homeService.updateHome(id, body);
  }

  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return this.homeService.deleteHome(id);
  }

  //  1) Buyer sends message to Realtor
  // 2) Realtor gets all messages

  @Roles(UserType.BUYER)
  @Post('/inquire/:id')
  inquire(
    @Param('id', ParseIntPipe) homeId: number,
    @User() user: UserInfo,
    @Body() { message: HomeResponseDto },
  ) {
    // return this.homeService.inquire(buyer, homeId,message);
    return true;
  }

  // @Roles(UserType.ADMIN)
  // @Get('/:id/message')
  // async getHomeMeassage(
  //   @Param('id', ParseIntPipe) homeId: number,
  //   @User() user: UserInfo,
  // ) {
  //   const realtor = await this.homeService.getBuyerByHomeId(id);
  // if(realtor.id!==user.id){
  //   throw new UnauthorizedException();
  // }

  // }
}
