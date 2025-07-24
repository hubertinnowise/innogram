import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    // private JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    // private JWT_SECRET = process.env.JWT_SECRET;

    private generateAccessToken(payload: { userId: string }): string {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '15m' }, // hardcoded 15mins
        );
    }

    private generateRefreshToken(payload: { userId: string }): string {
        return jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
            { expiresIn: '7d' }, // hardcoded 7days
        );
    }

    async login(_data: LoginDto) {
        const userId = uuidv4(); // replace with real DB user ID later

        const accessToken = this.generateAccessToken({ userId });
        const refreshToken = this.generateRefreshToken({ userId });

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(_refreshToken: string) {
        // remove from DB later
        return;
    }

    async refresh(refreshToken: string) {
        const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!jwtRefreshSecret) {
            throw new Error('JWT_REFRESH_SECRET is not set');
        }
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as jwt.JwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = this.generateAccessToken({ userId: decoded.userId });
        const newRefreshToken = this.generateRefreshToken({ userId: decoded.userId });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    async register(data: RegisterDto) {
        return {
            message: 'User registered',
            user: {
                email: data.email,
                id: uuidv4(),
            },
        };
    }
}
