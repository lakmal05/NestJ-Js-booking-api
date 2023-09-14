import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsPositive()
  catogry_id: number;
}

export class updateProductDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsPositive()
  price: number;
}

export class ProductResponseDto {
  name: string;
  // price: string;
  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
