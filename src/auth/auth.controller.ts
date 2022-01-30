import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserId, CurrentUserRt, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { Request, Response } from 'express';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signUp(@Body() body: AuthDto) {
    await this.authService.signUp(body);
    return {
      message:
        'Successful registration, please check your email to activate your account.',
    };
  }

  @Public()
  @Post('verify')
  async verifyAccount(@Body() body: any) {
    await this.authService.activeAccount(body);
    return {
      message: 'Account has already active',
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@CurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook')
  async facebookLogin(): Promise<any> {
    console.log(process.env.APP_ID_FACEBOOK);
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook/redirect')
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshTokens(
    @CurrentUserRt() refreshToken: string,
    @CurrentUserId() userId: number,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('generate')
  async register(@CurrentUserId() userId: number, @Res() response: Response) {
    console.log('111');
    console.log(userId);
    const { otpauthUrl } =
      await this.authService.generateTwoFactorAuthenticationSecret(userId);

    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }
}
