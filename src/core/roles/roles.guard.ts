import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // return false;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      user.roles.some((role) => !!requiredRoles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}
