import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  GatewayTimeoutException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

// Http error
export class ErrorNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('Not found - Error: ', error);
  }
}

export class ErrorUnauthorizedException extends ForbiddenException {
  constructor(error?: string) {
    super('Unauthorized - Error: ', error);
  }
}

export class ErrorForbiddenException extends ForbiddenException {
  constructor(error?: string) {
    super('Forbidden - Error: ', error);
  }
}

export class ErrorBadRequestException extends BadRequestException {
  constructor(error?: string) {
    super('Bad request - Error: ', error);
  }
}

export class ErrorAcceptableException extends NotAcceptableException {
  constructor(error?: string) {
    super('Not acceptable - Error: ', error);
  }
}

export class ErrorRequestTimeoutException extends RequestTimeoutException {
  constructor(error?: string) {
    super('Request timeout - Error: ', error);
  }
}

export class ErrorUnsupportedMediaTypeException extends UnsupportedMediaTypeException {
  constructor(error?: string) {
    super('Unsupported media type - Error: ', error);
  }
}

export class ErrorInternalServerException extends InternalServerErrorException {
  constructor(error?: string) {
    super('Internal server error - Error: ', error);
  }
}

export class ErrorMethodNotAllowedException extends MethodNotAllowedException {
  constructor(error?: string) {
    super('Method not allowed - Error: ', error);
  }
}

export class ErrorServiceUnavailableException extends ServiceUnavailableException {
  constructor(error?: string) {
    super('Service unavailable - Error: ', error);
  }
}

// Gateway error
export class ErrorBadGatewayException extends BadGatewayException {
  constructor(error?: string) {
    super('Bad gateway - Error: ', error);
  }
}

export class ErrorGatewayTimeoutException extends GatewayTimeoutException {
  constructor(error?: string) {
    super('Gateway timeout - Error: ', error);
  }
}

// ConflictException
// GoneException
// PayloadTooLargeException
// UnprocessableEntityException
// NotImplementedException
// ImATeapotException

//https://github.dev/NarHakobyan/awesome-nest-boilerplate
//https://viblo.asia/p/framework-nestjs-exception-filters-bWrZn7qrlxw
