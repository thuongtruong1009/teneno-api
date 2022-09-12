import { Controller } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiMethodNotAllowedResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiRequestTimeoutResponse,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EROLE, SYSTEM_ERROR } from 'src/core/constants';
import { RoleDecorator } from 'src/core/roles';

@ApiTags('Admin')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: SYSTEM_ERROR.UNAUTHORIZED })
@ApiForbiddenResponse({ description: SYSTEM_ERROR.FORBIDDEN })
@ApiNotFoundResponse({
    description: SYSTEM_ERROR.NOT_FOUND,
    type: Error,
})
@ApiMethodNotAllowedResponse({ description: SYSTEM_ERROR.METHOD_NOT_ALLOWED })
@ApiNotAcceptableResponse({
    description: SYSTEM_ERROR.NOT_ACCEPTABLE,
})
@ApiRequestTimeoutResponse({ description: SYSTEM_ERROR.REQUEST_TIMEOUT })
@ApiConflictResponse({
    description: SYSTEM_ERROR.CONFLICT,
})
@ApiTooManyRequestsResponse({ description: SYSTEM_ERROR.TOO_MANY_REQUESTS })
@ApiInternalServerErrorResponse({
    description: SYSTEM_ERROR.INTERNAL_SERVER_ERROR,
})
@RoleDecorator(EROLE.ADMIN)
@Controller('admin')
export class AdminController {}
