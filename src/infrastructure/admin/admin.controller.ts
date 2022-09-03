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
import { ROLE, RoleDecorator } from 'src/core/roles';

@ApiTags('Admin')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({
  description: 'Not Found.',
  type: Error,
})
@ApiMethodNotAllowedResponse({ description: 'Method Not Allowed.' })
@ApiNotAcceptableResponse({
  description: 'Provided fields are not in correct form.',
})
@ApiRequestTimeoutResponse({ description: 'Request Timeout.' })
@ApiConflictResponse({
  description: 'Conflict existed.',
})
@ApiTooManyRequestsResponse({ description: 'Too Many Requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
@RoleDecorator(ROLE.ADMIN)
@Controller('admin')
export class AdminController {}
