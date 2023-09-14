import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStateDto } from './dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const countrySelect = {
  country_id: true,
  country_name: true,
};

interface CreateDocumentParams {
  country_name: string;
  country_color:string;
  states: { state_name: string }[];
}

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const document = await this.prismaService.country.findMany({
      select: {
        ...countrySelect,

        // state: {
        //   select: {
        //     state_id: true,
        //     state_name: true,
        //   },
        // },
      },
      //   city: {
      //     select: {
      //       city_id: true,
      //       city_name: true,
      //     },
      //   },
    });

    // if (!document.length) {
    //   const dynamicJSON = {
    //     allData: {
    //       fields: [
    //         {
    //           label: 'Country Name',
    //           key: 'country_name',
    //           type: 'text',
    //         },
    //       ],

    //       url: 'country',
    //       data: document,
    //     },
    //   };

    //   return dynamicJSON;
    // } else {
    //   const dynamicJSON = {
    //     allData: {
    //       fields: [
    //         {
    //           label: 'Country Name',
    //           key: 'country_name',
    //           type: 'text',
    //         },
    //       ],

    //       url: 'country',
    //       data: document,
    //     },
    //   };

    //   return dynamicJSON;
    // }
    return document;
  }

  async getCountryById(country_id: number) {
    const country = this.prismaService.state.findMany({
      where: {
        country_id,
      },
      select: {
        state_id: true,
        city_name: true,
        state_name: true,
        country_id: true,
        country: true,

        //   city: {
        //     select: {
        //       city_id: true,
        //       city_name: true,
        //     },
        //   },
      },
    });

    return country;
  }
   //async createDocument({ country_name,country_color, states }: CreateDocumentParams) {
  async createDocument(body: any) {
    console.log(body, 'service data body');

    const country = await this.prismaService.country.create({
      data: {
      ...body
      },
    });
   
    
    // if (states != null) {
    //   const stateD = states.map((state) => {
    //     return { ...state, country_id: country.country_id };
    //   });
    //   await this.prismaService.state.createMany({ data: stateD });
    //   return stateD;
    // }
  }

  async createState(body: CreateStateDto) {
    const { state_name, country_id } = body;
    const state = this.prismaService.state.create({
      data: {
        state_name,
        country: {
          connect: {
            country_id,
          },
        },
      },
      include: { country: true },
    });

    return state;
  }

  getTableCoulmns = async () => {
    console.log('res coulmns');

    let response;
    try {
      response = await prisma.$queryRaw`
      SELECT  column_name, data_type, character_maximum_length, column_default
      FROM information_schema.columns
      WHERE table_name = 'country'`;
    } catch (err) {
      console.log(err);
    }

    console.log(response);

    return response;
  };
}
