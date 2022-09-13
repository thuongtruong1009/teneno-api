import { AuthGuard } from '@nestjs/passport';
import { ESTRATEGY } from 'src/core/constants';

export class RtGuard extends AuthGuard(ESTRATEGY.JWT_REFRESH) {
    constructor() {
        super();
    }
}
