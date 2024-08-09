import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as config from 'config';
import { Auth } from '../iam/auth.interface';
import { JWTService } from '../iam/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JWTService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = await this._authorize(context);
    request.auth = auth;
    return auth !== null;
  }

  private async _authorize(context: ExecutionContext): Promise<Auth | null> {
    // is authorization enabled? useful for development
    if (!config.get<boolean>('server.enableAuthorization'))
      return { id: 'DEV_TEST', username: 'DEVELOPMENT_TEST', role: 'admin' };

    const request = context.switchToHttp().getRequest();
    if (
      request.header('Authorization') &&
      request.header('Authorization').startsWith('Bearer')
    ) {
      const token = request.header('Authorization')!.split(' ')[1];
      try {
        const decoded = this.jwtService.decodeJwt(token);
        const auth: Auth = {
          id: decoded.sub,
          role: decoded.role,
          username: decoded.username,
        };
        const roles = this.reflector.get<string[]>(
          'roles',
          context.getHandler(),
        );
        if (roles && !roles.find((role) => role === auth.role)) return null;
        return auth;
      } catch (error) {
        throw error;
      }
    }
    return null;
  }
}
