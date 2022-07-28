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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards';
import { AuthDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { ITokens } from './types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Public()
  @Post('local/signup')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  signupLocal(@Body() dto: AuthDto): Promise<ITokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to user account' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {access-token}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  signinLocal(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user account' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout account on all devices' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Put('password')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  updatePassWord(@Body() dto: LoginDto): Promise<ITokens> {
    return this.authService.updatePassWord(dto);
  }
}
