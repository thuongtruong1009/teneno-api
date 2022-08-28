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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { AtGuard, RtGuard } from './guards';
import { LoginDto, SignupDto, UpdatePasswordDto } from './dto';
import { ITokens } from './interfaces';

@ApiTags('Auth')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiNotFoundResponse({
  description: 'Not Found.',
  type: Error,
})
@ApiOkResponse({ description: 'Success.' })
@ApiNotAcceptableResponse({
  description: 'Provided fields are not in correct form.',
})
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
  @ApiOperation({ summary: 'Login to user account (user)' })
  async signinLocal(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
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
  @ApiOperation({ summary: 'Logout account on all devices (user)' })
  async refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<ITokens> {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Put('password')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success.' })
  @ApiOperation({ summary: 'Update user password (all)' })
  async updatePassWord(@Body() dto: UpdatePasswordDto): Promise<ITokens> {
    return this.authService.updatePassWord(dto);
  }
}
