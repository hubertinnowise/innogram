import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'packages/jwt-auth.guard';

import { AdminGuard } from '../../core/guards/admin-guard';
import { NotSelfGuard } from '../../core/guards/not-self-guard';
import { SelfGuard } from '../../core/guards/self-guard';
import { PublicUserDto, UpdateUserDto } from './dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
    @Patch(':id/ban')
    async banUser(@Param('id') id: string, @Body() dto: BanUserDto, @Req() req): Promise<void> {
        const adminId = req.user.id;
        await this.userService.banUser(id, dto, adminId);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Post(':id/block')
    async blockUser(@Param('id') id: string, @Req() req: any) {
        const blockerId = req.user.id;
        return this.userService.blockUser(id, blockerId);
    }

    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Post(':id/follow')
    @HttpCode(201)
    async followUser(@Param('id') targetUserId: string, @Req() req: any) {
        return this.userService.followUser(req.user.id, targetUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserDetails(@Param('id') id: string): Promise<PublicUserDto> {
        return this.userService.getUserDetails(id);
    }

    // leave for now
    // @Delete(':id/soft')
    // @HttpCode(204)
    // async softDeleteUser(@Param('id') id: string): Promise<void> {
    //     // await this.userService.softDeleteUser(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Get(':id/following')
    async getUserFollowees(@Param('id') id: string): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowees(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/followers')
    async getUserFollowers(@Param('id') id: string): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowers(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete(':id')
    @HttpCode(204)
    async hardDeleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.hardDeleteUser(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
    @Patch(':id/unban')
    @HttpCode(204)
    async unbanUser(@Param('id') id: string): Promise<void> {
        await this.userService.unbanUser(id);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Delete(':id/block')
    @HttpCode(204)
    async unblockUser(@Req() req, @Param('id') blockedId: string): Promise<void> {
        await this.userService.unblockUser(req.user.id, blockedId);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Delete(':id/follow')
    @HttpCode(204) // No Content
    async unfollowUser(@Param('id') targetUserId: string, @Req() req: any): Promise<void> {
        await this.userService.unfollowUser(req.user.id, targetUserId);
    }

    @UseGuards(JwtAuthGuard, SelfGuard, AdminGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }
}
