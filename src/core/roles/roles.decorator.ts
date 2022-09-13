import { SetMetadata } from '@nestjs/common';
import { EROLE } from '../constants';

export const RoleDecorator = (...roles: EROLE[]) => SetMetadata('roles', roles);
