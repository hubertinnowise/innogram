import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import {
    LoginResponse,
    RegisterResponse,
    RefreshResponse,
    LogoutResponse,
    ChangePasswordResponse,
    ForgotPasswordResponse,
    ResendVerificationResponse,
    ResetPasswordResponse,
    VerifyEmailResponse,
} from './responses';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(201)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiCreatedResponse({ description: 'User registered', type: RegisterResponse })
    async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login and receive tokens' })
    @ApiOkResponse({ description: 'Login successful', type: LoginResponse })
    async login(@Body() dto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token using refresh token' })
    @ApiOkResponse({ description: 'Token refreshed', type: RefreshResponse })
    async refresh(@Body('refreshToken') refreshToken: string): Promise<RefreshResponse> {
        return this.authService.refresh(refreshToken);
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout by revoking the refresh token' })
    @ApiOkResponse({ description: 'Logged out', type: LogoutResponse })
    async logout(@Body('refreshToken') refreshToken: string): Promise<LogoutResponse> {
        return this.authService.logout(refreshToken);
    }

    @Patch('change-password')
    @ApiOperation({ summary: 'Change password (requires old and new password)' })
    @ApiOkResponse({ description: 'Password changed', type: ChangePasswordResponse })
    async changePassword(@Body() dto: ChangePasswordDto): Promise<ChangePasswordResponse> {
        return this.authService.changePassword(dto.userId, dto.oldPassword, dto.newPassword);
    }

    @Post('forgot-password')
    @ApiOperation({ summary: 'Generate password reset token' })
    @ApiOkResponse({ description: 'Reset token generated', type: ForgotPasswordResponse })
    async forgotPassword(@Body('email') email: string): Promise<ForgotPasswordResponse> {
        return this.authService.forgotPassword(email);
    }

    @Post('resend-verification')
    @ApiOperation({ summary: 'Resend email verification token' })
    @ApiOkResponse({ description: 'Verification re-sent', type: ResendVerificationResponse })
    async resendVerification(@Body('email') email: string): Promise<ResendVerificationResponse> {
        return this.authService.resendVerification(email);
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Reset password using a reset token' })
    @ApiOkResponse({ description: 'Password updated', type: ResetPasswordResponse })
    async resetPassword(
        @Body('token') token: string,
        @Body('newPassword') newPassword: string,
    ): Promise<ResetPasswordResponse> {
        return this.authService.resetPassword(token, newPassword);
    }

    @Post('verify-email')
    @ApiOperation({ summary: 'Verify email using a verification token' })
    @ApiOkResponse({ description: 'Email verified', type: VerifyEmailResponse })
    async verifyEmail(@Body('token') token: string): Promise<VerifyEmailResponse> {
        return this.authService.verifyEmail(token);
    }
}
