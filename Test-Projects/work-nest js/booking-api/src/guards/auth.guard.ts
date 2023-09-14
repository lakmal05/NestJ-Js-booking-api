import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

interface JWTPayload {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext){
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log(roles);

    //   determinate the usertytpe that can execute than call endpoint
    if (roles?.length) {
      //   grab the jwt from req header and verfy it

      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split('Bearer ')[1];

      try {
        const payload = (await jwt.verify(
          token,
          process.env.JSON_WEB_TOKEN_KEY,
        )) as JWTPayload;

        const user = await this.prismaService.user.findUnique({
          where: {
            id: payload.id,
          },
        });

        if (!user) {
          return false;
        }

        if (roles.includes(user.user_type)) {
          return true;
        }
        //    [UserType.Admin,UserType.Buyer].includes(UserType.Buyer)

        console.log('user one', { user });
        // return false;
      } catch (error) {
        return false;
      }
    }
    //   database req to get user by id
    //   detemine if the user can permisson

    // return true;
  }
}
