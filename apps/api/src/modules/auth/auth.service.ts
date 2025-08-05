import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Prisma } from '../../../prisma/generated/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  LoginDto,
  RegisterDto,
} from './dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    @Inject('RABBITMQ_CLIENT') private readonly rabbitClient: ClientProxy,
  ) {}

  private async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private generateTokens(userId: string) {
    const accessToken = this.jwt.sign({ sub: userId }, { expiresIn: '15m' });
    const refreshToken = this.jwt.sign({ sub: userId }, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  private async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !(await this.compare(oldPassword, user.passwordHash))) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const passwordHash = await this.hash(newPassword);

    await this.prisma.user.update({
      data: { passwordHash } as Prisma.UserUncheckedUpdateInput,
      where: { id: userId },
    });

    return { message: 'Password changed' };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const token = uuidv4();
    
    // TODO SEND EMAIL IN PROD
    // await this.prisma.user.update({
    //   data: {
    //     passwordResetExpires: addMinutes(new Date(), 30),
    //     passwordResetToken: token,
    //   },
    //   where: { email },
    // });

    return { message: 'Password reset token generated', token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await this.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id);
    await this.prisma.token.upsert({
      create: {
        accessToken: tokens.accessToken,
        expiresAt: addMinutes(new Date(), 10080),
        refreshToken: tokens.refreshToken,
        userId: user.id,
      },
      update: {
        accessToken: tokens.accessToken,
        expiresAt: addMinutes(new Date(), 10080),
        refreshToken: tokens.refreshToken,
      },
      where: { userId: user.id },
    });

    return { userId: user.id, ...tokens };
  }

  async logout(refreshToken: string) {
    await this.prisma.token.deleteMany({ where: { refreshToken } });
    return { message: 'Logged out' };
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.token.findFirst({ where: { refreshToken } });
    if (!stored || new Date(stored.expiresAt) < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = this.generateTokens(stored.userId);
    await this.prisma.token.update({
      data: {
        accessToken: tokens.accessToken,
        expiresAt: addMinutes(new Date(), 10080),
        refreshToken: tokens.refreshToken,
      },
      where: { userId: stored.userId },
    });

    return { userId: stored.userId, ...tokens };
  }

  async register(dto: RegisterDto) {
    const passwordHash = await this.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        emailVerificationExpires: addMinutes(new Date(), 60),
        emailVerificationToken: uuidv4(),
        passwordHash,
        phoneNumber: dto.phoneNumber,
        username: dto.username,
      },
    });

    // rabbit email service
    // this.rabbitClient.emit('user_registered', {
    //   email: user.email,
    //   name: user.username,
    //   verificationToken: user.emailVerificationToken,
    // });

    const tokens = this.generateTokens(user.id);
    await this.prisma.token.create({
      data: {
        accessToken: tokens.accessToken,
        expiresAt: addMinutes(new Date(), 10080), // 7 days
        refreshToken: tokens.refreshToken,
        userId: user.id,
      },
    });

    return { userId: user.id, ...tokens };
  }

  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const token = uuidv4();
    await this.prisma.user.update({
      data: {
        emailVerificationExpires: addMinutes(new Date(), 60),
        emailVerificationToken: token,
      },
      where: { email },
    });

    // TODO SEND EMAIL IN PROD

    return { message: 'Verification email re-sent', token }; 
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({ where: { passwordResetToken: token } });
    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await this.hash(newPassword);
    await this.prisma.user.update({
      data: {
        passwordHash,
        passwordResetExpires: null,
        passwordResetToken: null,
      },
      where: { id: user.id },
    });

    return { message: 'Password updated' };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({ where: { emailVerificationToken: token } });
    if (!user || !user.emailVerificationExpires || user.emailVerificationExpires < new Date()) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.user.update({
      data: {
        emailVerificationExpires: null,
        emailVerificationToken: null,
      },
      where: { id: user.id },
    });

    return { message: 'Email verified' };
  }
}
