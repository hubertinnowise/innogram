import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from './prisma/prisma.service';

import {
    LoginDto,
    RegisterDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    ChangePasswordDto,
    VerifyEmailDto,
} from './auth.dto';

@Injectable()
export class AuthService {
    //PrismaService injection to use it
    constructor(private readonly prisma: PrismaService) {}

    private generateAccessToken(payload: { userId: string }): string {
        return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', {
            expiresIn: '15m',
        });
    }

    private generateRefreshToken(payload: { userId: string }): string {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret', {
            expiresIn: '7d',
        });
    }

    async login(_data: LoginDto) {
        const userId = uuidv4(); // Mocked user
        const accessToken = this.generateAccessToken({ userId });
        const refreshToken = this.generateRefreshToken({ userId });

        return { accessToken, refreshToken };
    }

    async logout(_refreshToken: string) {
        // Invalidate refresh token from DB (mocked as no-op)
        return { message: 'Logged out (mocked)' };
    }

    async refresh(refreshToken: string) {
        const secret = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';

        const decoded = jwt.verify(refreshToken, secret) as jwt.JwtPayload;

        if (!decoded?.userId) {
            throw new Error('Invalid refresh token');
        }

        const accessToken = this.generateAccessToken({ userId: decoded.userId });
        const newRefreshToken = this.generateRefreshToken({ userId: decoded.userId });

        return { accessToken, refreshToken: newRefreshToken };
    }

    async register(data: RegisterDto) {
        return {
            message: 'User registered (mocked)',
            user: {
                email: data.email,
                id: uuidv4(),
            },
        };
    }

    async forgotPassword(email: string) {
        const resetToken = uuidv4(); // Mocked token

        /*
            TODO:
            sending email with like the password reset site link or smth
        */
            
        return {
            message: `Password reset link sent to ${email} (mocked)`,
            resetToken,
        };
    }

    async resetPassword(token: string, newPassword: string) {
        console.log(`Resetting password with token=${token} to new password=${newPassword}`);
        return {
            message: 'Password has been reset (mocked)',
        };
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        console.log(`Changing password for user=${userId} from ${oldPassword} to ${newPassword}`);
        return {
            message: 'Password changed (mocked)',
        };
    }

    async verifyEmail(token: string) {
        console.log(`Verifying email with token=${token}`);
        return {
            message: 'Email verified (mocked)',
        };
    }

    async resendVerification(email: string) {
        const verificationToken = uuidv4();
        console.log(`Resend email verification to ${email} (token=${verificationToken})`);
        return {
            message: `Verification email sent to ${email} (mocked)`,
            verificationToken,
        };
    }
}
