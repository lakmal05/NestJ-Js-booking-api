import { IsString } from 'class-validator';
export class updateCatogryDto {
  @IsString()
  catogry_name: string;
}

export class createCatogryDto {
  catogry_name: string;
}

export class CatogryResponseDto {
  catogry_name: string;
  constructor(partial: Partial<CatogryResponseDto>) {
    Object.assign(this, partial);
  }
}
