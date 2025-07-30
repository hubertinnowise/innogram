import { Body, Controller, Post } from '@nestjs/common';
import {
    LoginDto,
    RefreshDto,
    RegisterDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    ChangePasswordDto,
    VerifyEmailDto
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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

    @Post('forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDto) {
        return this.authService.forgotPassword(body.email);
    }

    @Post('reset-password')
    resetPassword(@Body() body: ResetPasswordDto) {
        return this.authService.resetPassword(body.token, body.newPassword);
    }

    @Post('change-password')
    changePassword(@Body() body: ChangePasswordDto) {
        return this.authService.changePassword(body.userId, body.oldPassword, body.newPassword);
    }

    @Post('verify-email')
    verifyEmail(@Body() body: VerifyEmailDto) {
        return this.authService.verifyEmail(body.token);
    }

    @Post('resend-verification')
    resendVerification(@Body() body: { email: string }) {
        return this.authService.resendVerification(body.email);
    }
}
