import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { EROLE } from '../constants';
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

        const request = context.switchToHttp().getRequest();
        console.log(`--> User: ${request}`);
        // console.log('request', this.parseJwt(request));

        return this.matchRoles(requiredRoles, 'USER');
    }

    matchRoles(roles: EROLE[], role: string) {
        console.log(`--> Require role: ${roles}`);
        console.log(`--> Current role: ${role}`);
        console.log(`--> Matched: ${roles.includes(role as EROLE)}`);
        return roles.find((el) => el === role) ? true : false;
    }

    parseJwt(token) {
        return JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString(),
        );
    }
}
