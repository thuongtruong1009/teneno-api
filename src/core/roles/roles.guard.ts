import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_ERROR, EROLE } from '../constants';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<EROLE[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest().secret;

        const data = this.parseJwt(request);

        if (
            data.key !== process.env.ADMIN_KEY ||
            data.id !== process.env.ADMIN_SUB
        ) {
            throw new UnauthorizedException(AUTH_ERROR.NOT_ADMIN);
        }

        return this.matchRoles(requiredRoles, data.role);
    }

    matchRoles(roles: EROLE[], role: string) {
        console.log(`--> Matched role: ${roles.includes(role as EROLE)}`);
        return roles.find((el) => el === role) ? true : false;
    }

    parseJwt(token) {
        return JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString(),
        );
    }
}
