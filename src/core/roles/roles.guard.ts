import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import console from 'console';
import { Observable } from 'rxjs';
import { EROLE } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<EROLE[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        if (!request.headers['Authorization']) return false;
        const { user } = request;

        if (!user || !user.role) return false;
        return this.matchRoles(requiredRoles, user.role);
    }

    matchRoles(roles: EROLE[], role: string) {
        return roles.find((el) => el === role) ? true : false;
    }
}
