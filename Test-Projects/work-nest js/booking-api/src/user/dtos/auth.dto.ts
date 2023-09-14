import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  //@Matches(/reg expression/,{message:"phone num must be a valid"})
  @IsString()
  phone: string;
 
  @IsString()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}



export class SignInDto{
  @IsString()
  @IsNotEmpty()
  email:string;

  @IsString()
  @MinLength(5)
  password:string;
}

export class ProductKeyDto{
  @IsString()
  @IsNotEmpty()
  
   email:string;
}