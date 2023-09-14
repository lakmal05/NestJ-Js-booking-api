import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class comDto {
  //   @ApiProperty({ type: [DynamicField] })
  //   @IsNotEmpty()
  //   @IsObject()
  //   @ValidateNested({ each: true })
  //   @Type(() => DynamicField)
  //   data: DynamicField[];
  @IsString()
  country_name: string;
}
