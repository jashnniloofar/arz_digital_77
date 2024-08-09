import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from './auth.interface';

export const GetAuth = createParamDecorator(
  (data, ctx: ExecutionContext): Auth => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);
