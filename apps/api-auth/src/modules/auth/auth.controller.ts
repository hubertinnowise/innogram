import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
    ChangePasswordDto,
    ForgotPasswordDto,
    LoginDto,
    RefreshDto,
    RegisterDto,
    ResetPasswordDto,
    VerifyEmailDto,
} from './dto';

@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //status codes?
    @Post('change-password')
    changePassword(@Body() body: ChangePasswordDto) {
        return this.authService.changePassword(body.userId, body.oldPassword, body.newPassword);
    }

    @Post('forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDto) {
        return this.authService.forgotPassword(body.email);
    }

    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Post('logout')
    logout(@Body() body: RefreshDto) {
        return this.authService.logout(body.refreshToken);
    }

    @Post('refresh')
    refresh(@Body() body: RefreshDto) {
        return this.authService.refresh(body.refreshToken);
    }

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @Post('resend-verification')
    resendVerification(@Body() body: { email: string }) {
        return this.authService.resendVerification(body.email);
    }

    @Post('reset-password')
    resetPassword(@Body() body: ResetPasswordDto) {
        return this.authService.resetPassword(body.token, body.newPassword);
    }

    @Post('verify-email')
    verifyEmail(@Body() body: VerifyEmailDto) {
        return this.authService.verifyEmail(body.token);
    }
}
