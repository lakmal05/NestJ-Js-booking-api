import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
const prisma = new PrismaClient();

@Injectable()
export class TablesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTables() {
    const tables = await this.prismaService.tables.findMany({
      select: {
        table_id: true,
        table_name: true,

        column: {
          select: {
            column_id: true,
            column_name: true,
            column_key: true,
          },
        },
      },
    });
    console.log();

   return tables;
  }

  async getTableById(table_id: number) {
    const table = await this.prismaService.tables.findUnique({
      where: {
        table_id,
      },
      select: {
        table_id: true,
        table_name: true,
      },
    });
    return table;
  }

  async getTableCoulmns(table_name: string) {
    console.log('res coulmns');

    let response;
    try {
      response = await prisma.$queryRaw`
      SELECT  column_name, data_type, character_maximum_length, column_default
      FROM information_schema.columns
      WHERE table_name = ${table_name}`;
    } catch (err) {
      console.log(err);
    }

    console.log(response);

    return response;
  }
}
