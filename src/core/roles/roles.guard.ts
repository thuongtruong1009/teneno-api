import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EROLE } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<EROLE[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }
        // return false;
        const { request } = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () =>
            user.roles.some((role) => user.roles.includes(role));

        return user && user.roles && hasRole();
    }
}
