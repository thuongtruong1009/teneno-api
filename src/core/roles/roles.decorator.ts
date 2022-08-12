import { SetMetadata } from '@nestjs/common';
import { ROLE } from './roles.enum';

export const RoleDecorator = (...roles: ROLE[]) => SetMetadata('roles', roles);
