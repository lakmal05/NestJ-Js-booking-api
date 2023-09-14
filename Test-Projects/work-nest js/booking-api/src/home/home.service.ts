import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';
import { UserInfo } from 'src/user/decorators/user.decorators';

interface GetHomesParam {
  address?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
  city?: string;
  propertyType?: string;
}

interface CreateHomeParams {
  city: string;
  address: string;
  price: number;
  images: { url: string }[];
  propertyType: string;
}

export const homeSelect = {
  id: true,
  address: true,
  city: true,
  price: true,
  propertyType: true,
  listed_date: true,
};

interface UpdateHomeParam {
  city?: string;
  address?: string;
  propertyType?: string;
  // images?: string;
  price?: number;
}

interface SaveImageParam {
  url?: string;
}

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveImage(url: string) {
    const userImage = await this.prismaService.userImage.create({
      data: {
        url,
      },
    });

    return userImage;
  }

  async getHomes(filters: GetHomesParam): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: {
        // id: true,
        // address: true,
        // city: true,
        // price: true,
        // propertyType: true,
        // listed_date: true,
        ...homeSelect,
        images: {
          select: {
            url: true,
          },
          //take: 1,
        },
      },
      where: filters,
    });

    if (!homes.length) {
      throw new NotFoundException();
    }

    // return homes.map((home) => new HomeResponseDto(home));
    return homes.map(
      (home) => new HomeResponseDto({ ...home, image: home.images[0].url }),
    );
  }

  async createHome(
    { city, address, price, images, propertyType }: CreateHomeParams,
    userId: number,
  ) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        city,
        price,
        propertyType,
        // user_Id:userId,
      },
    });

    console.log('home', home);

    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });

    await this.prismaService.image.createMany({ data: homeImages });
    return new HomeResponseDto(home);
  }

  async updateHome(id: number, data: UpdateHomeParam) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });
    if (!home) {
      throw new NotFoundException();
    }

    const updateHome = await this.prismaService.home.update({
      where: {
        id,
      },
      data,
    });
    return new HomeResponseDto(updateHome);
  }

  async deleteHome(id: number) {
    console.log('delte', id);

    await this.prismaService.image.delete({
      where: {
        // home_id: id,
      },
    });

    await this.prismaService.home.delete({
      where: {
        id,
      },
    });
  }

  async inquire(buyer: UserInfo, homeId, message) {
    // const buyer = await this.getBuyerByHomeId(homeId){

    // const newMessage = await this.prismaService.message.create({
    // data:{
    //   admin_id:admin.id,
    //   buyer_id:buyer.id,
    //   home_id:homeId,
    //   message
    // }

    //   })
    // }

    return true;
  }

  async getBuyerByHomeId(id: number) {
    //   const home = await this.prismaService.home.findUnique({
    //     where: {
    //       id,
    //     },
    //     select: {
    //       buyer:{
    //         select:{

    //           name:true,
    //           id:true
    //         }
    //       }
    //     },
    //   });
    // if(!realtor){
    //   throw new NotFoundException();
    // }
    //  return home.buyer_id;
    return true;
  }
}
