import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, updateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getProduct() {
    return this.productService.getProduct();
  }

  @Post('')
  createProduct(@Body() body: CreateProductDto) {
    // console.log(body.name,"contoller");
    return this.productService.createProduct(body);
  }

  @Delete(':id')
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateProductDto,
  ) {
    return this.productService.updateProduct(id, body);
  }

  @Get('/getColumns')
  getTableCoulmns() {
    return this.productService.getTableCoulmns();
  }
}
