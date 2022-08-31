import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { RtGuard } from './guards';
import { LoginDto, SignupDto, UpdatePasswordDto } from './dto';
import { ITokens } from './dto/response';

@ApiTags('Auth')
@ApiOkResponse({ description: 'Success.' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden.' })
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
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Create new user account' })
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Success.' })
  @ApiCreatedResponse({
    description: 'The new account has been created.',
    type: SignupDto,
  })
  async signupLocal(@Body() dto: SignupDto): Promise<ITokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success.' })
  @ApiOperation({ summary: 'Login to user account' })
  async signinLocal(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success.' })
  @ApiOperation({ summary: 'Logout user account (user)' })
  async logout(@GetCurrentUserId() userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @ApiOkResponse({ description: 'Success.' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout account on all devices' })
  async refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<ITokens> {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Put('password')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success.' })
  @ApiOperation({ summary: 'Update user password' })
  async updatePassWord(@Body() dto: UpdatePasswordDto): Promise<ITokens> {
    return this.authService.updatePassWord(dto);
  }
}
