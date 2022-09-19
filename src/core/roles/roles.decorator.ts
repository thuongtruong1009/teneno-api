import { SetMetadata } from '@nestjs/common';
import { EROLE } from '../constants';

export const ROLES_KEY = 'roles';
export const RoleDecorator = (...roles: EROLE[]) =>
    SetMetadata(ROLES_KEY, roles);
