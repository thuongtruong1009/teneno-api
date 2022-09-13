import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ESTRATEGY } from 'src/core/constants';

@Injectable()
export class AtGuard extends AuthGuard(ESTRATEGY.JWT) {
    constructor(private reflector: Reflector) {
        super();
    }

    // if true will enter with access-token , and another hand
    public canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}
