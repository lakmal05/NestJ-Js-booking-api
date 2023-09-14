import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
/*schema prisma eke data import krgna one nm */
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ProductKeyDto } from '../dtos/auth.dto';

interface SignupParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /*email user krnne eka uinq krgla ganna*/
  async signup({ name, email, password, phone }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return ConflictException;
    }
    /*else */

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        name,
        user_type: UserType.BUYER,
      },
    });
    return user;
  }

  async signIn({ email, password }: SignInParams) {
    //  const sign

    console.log('sign in email', email);

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new HttpException('invalid cardential', 400);
    }

    const token = await this.generateJWT(user.email, user.id, user.user_type);
    console.log(token);

    return token;
  }

  generateJWT(email: string, id: number, user_type: any) {
    return jwt.sign(
      {
        email,
        id,
        user_type,
      },
      process.env.JSON_WEB_TOKEN_KEY,
      {
        expiresIn: 360000,
      },
    );
  }

  async generateProductKey(email: string) {
    const productKey = `${email}-${process.env.PRODUCT_KEY}`;
    // const refCOde = productKey + 'something';
    const refCOde = await bcrypt.hash(productKey, 10);
    console.log(refCOde);

    return refCOde;
  }

  async logout(email: string) {
    console.log(email);
  }
}
