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
  ApiHeader,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { AtGuard, RtGuard } from './common/guards';
import { LoginDto, SignupDto } from './dto';
import { ITokens } from './types';

@ApiTags('Auth')
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
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user account' })
  @ApiCreatedResponse({
    description: 'The new account has been created.',
    type: SignupDto,
  })
  signupLocal(@Body() dto: SignupDto): Promise<ITokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to user account' })
  signinLocal(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @ApiOperation({ summary: 'Logout user account' })
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout account on all devices' })
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Put('password')
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user password' })
  updatePassWord(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.updatePassWord(dto);
  }
}
