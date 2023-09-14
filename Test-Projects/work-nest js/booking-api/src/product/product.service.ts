import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, ProductResponseDto } from './dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const productSelect = {
  id: true,
  name: true,
  price: true,
  catogry_id: true,
};

interface UpdateProductParam {
  name?: string;
  price?: number;
}

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProduct() {
    const product = await this.prismaService.product.findMany({
      select: {
        ...productSelect,
      },
    });
    if (!product.length) {
      const dynamicJSON = {
        allData: {
          fields: [
            // {
            //   label: 'Catogry Id',
            //   key: 'catogry_id',
            //   type: 'number',
            // },
            {
              label: 'Product Name',
              key: 'product_name',
              type: 'text',
            },
          ],
          url: 'product',
          data: product,
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
              label: 'Product Name',
              key: 'product_name',
              type: 'text',
            },
          ],
          url: 'product',
          data: product,
        },
      };

      return dynamicJSON;
    }
  }

  async createProduct(body: CreateProductDto) {
    console.log({ body });

    const { name, price, catogry_id } = body;
    return this.prismaService.product.create({
      data: {
        name,
        price,
        catogry: {
          connect: { catogry_id },
        },
      },
      include: { catogry: true },
    });
  }

  async deleteProduct(id: number) {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }

  async updateProduct(id: number, data: UpdateProductParam) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }

    const updateProduct = await this.prismaService.product.update({
      where: {
        id,
      },
      data,
    });
    return new ProductResponseDto(updateProduct);
  }

  async getTableCoulmns() {
    let response;
    try {
      response = await prisma.$queryRaw`
      SELECT  column_name, data_type, character_maximum_length, column_default
      FROM information_schema.columns
      WHERE table_name = 'Product'`;
    } catch (err) {
      console.log(err);
    }

    return response;
  }
}
