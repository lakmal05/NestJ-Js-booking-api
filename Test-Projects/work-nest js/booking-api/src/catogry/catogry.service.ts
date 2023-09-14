import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { sql } from '@prisma/client';
import { CatogryResponseDto } from './dto';
// import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const catogrySelect = {
  catogry_id: true,
  catogry_name: true,
};

interface UpdateCatogryParam {
  catogry_name?: string;
}

@Injectable()
export class CatogryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCatogry() {
    const catogry = await this.prismaService.catogry.findMany({
      select: {
        ...catogrySelect,
      },
    });

    if (!catogry.length) {
      const dynamicJSON = {
        allData: {
          fields: [
            // {
            //   label: 'Catogry Id',
            //   key: 'catogry_id',
            //   type: 'number',
            // },
            {
              label: 'Catogry Name',
              key: 'catogry_name',
              type: 'text',
            },
          ],
          url: 'catogry',
          data: catogry,
        },
      };

      return dynamicJSON;
    } else {
      const dynamicJSON = {
        allData: {
          fields: [
            // {
            //   label: 'Catogry Id',
            //   key: 'catogry_id',
            //   type: 'number',
            // },
            {
              label: 'Catogry Name',
              key: 'catogry_name',
              type: 'text',
            },
          ],
          url: 'catogry',
          data: catogry,
        },
      };

      return dynamicJSON;
    }
  }

  async createCatogry(data: any) {
    const catogry_name = data.catogry_name;
    console.log(catogry_name);

    const category = await this.prismaService.catogry.create({
      data: { catogry_name },
    });

    console.log(category);

    return category;
  }

  async deleteCatogry(catogry_id: number) {
    await this.prismaService.catogry.delete({
      where: {
        catogry_id,
      },
    });
  }

  async updateCatogry(catogry_id: number, data: UpdateCatogryParam) {
    const category = await this.prismaService.catogry.findUnique({
      where: {
        catogry_id,
      },
    });
    if (!category) {
      throw new NotFoundException();
    }

    const updateCatogry = await this.prismaService.catogry.update({
      where: {
        catogry_id,
      },
      data,
    });
    return new CatogryResponseDto(updateCatogry);
  }

  async saveImage(url: string) {
    const userImage = await this.prismaService.userImage.create({
      data: {
        url,
      },
    });

    return userImage;
  }

  getTableCoulmns = async () => {
    let response;
    try {
      response = await prisma.$queryRaw`
      SELECT  column_name, data_type, character_maximum_length, column_default
      FROM information_schema.columns
      WHERE table_name = 'Catogry'`;
    } catch (err) {
      console.log(err);
    }

    return response;
  };
}
