// import {} from 'class-transformer'

import { Exclude, Expose, Type } from 'class-transformer';
import {
  Allow,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Entity } from 'typeorm';

export class HomeResponseDto {
  id: number;
  address: string;
  city: string;

  @Exclude()
  listed_date: Date;
  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listedDate;
  }
  image: string;
  price: number;
  propertyType: string;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}

export class saveImageDto {
  @IsString()
  @IsOptional()
  url: string;
}

export class CreateHomeDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsPositive()
  price: number;

  @Allow()
  @Type(() => Image)
  images: Image[];

  @IsString()
  propertyType: string;
}

class Image {
  url: string;
}

export class updateHomeDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsPositive()
  @IsOptional()
  price: number;

  // @IsString()
  // @Allow()
  // @Type(() => Image)
  // @IsOptional()
  // images: Image[];

  @IsString()
  @IsOptional()
  propertyType: string;
}

export class delteHomeDto {}

export class InquireDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
