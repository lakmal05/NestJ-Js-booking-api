import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Allow,
  IsNotEmpty,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
  Validator,
} from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
import { comDto } from 'src/commonDTO/commondto';

export class CreateDocumentDto {
  // @IsString()
  // country_name: string;
  // // @Allow()
  // // @Type(() => State)
  // // states: State[];

 
}

class DynamicData {
  [key: string]: any;
}

export class DynamicDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DynamicData)
  data: DynamicData;
}


class State {
  state_name: string;
}

export class CreateStateDto {
  @IsString()
  state_name: string;

  @IsPositive()
  country_id: number;
}
