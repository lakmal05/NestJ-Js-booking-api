import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// import { UserInfo } from 'src/user/decorators/user.decorators';

export interface UserInfo{
    email: string;
    id: number;
    iat: number;
    exp: number;

}


export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.user;
});
