import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'packages/jwt-auth.guard';

import { AdminGuard } from '../../core/guards/admin-guard';
import { NotSelfGuard } from '../../core/guards/not-self-guard';
import { SelfGuard } from '../../core/guards/self-guard';
import { PublicUserDto, UpdateUserDto } from './dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserService } from './user.service';

/* apitags  apioperations api responses */

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
    @Patch(':id/ban')
    @ApiOperation({ summary: 'Ban a user (admin only, cannot ban self)' })
    async banUser(@Param('id') id: string, @Body() dto: BanUserDto, @Req() req): Promise<void> {
        const adminId = req.user.id;
        await this.userService.banUser(id, dto, adminId);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Post(':id/block')
    @ApiOperation({ summary: 'Block a user' })
    async blockUser(@Param('id') id: string, @Req() req: any) {
        const blockerId = req.user.id;
        return this.userService.blockUser(id, blockerId);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Post(':id/follow')
    @HttpCode(201)
    @ApiOperation({ summary: 'Follow a user' })
    async followUser(@Param('id') targetUserId: string, @Req() req: any) {
        return this.userService.followUser(req.user.id, targetUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Get public user details' })
    async getUserDetails(@Param('id') id: string): Promise<PublicUserDto> {
        return this.userService.getUserDetails(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/following')
    @ApiOperation({ summary: 'List users that the given user follows' })
    async getUserFollowees(@Param('id') id: string): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowees(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/followers')
    @ApiOperation({ summary: 'List followers of the given user' })
    async getUserFollowers(@Param('id') id: string): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowers(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Hard delete a user (admin only)' })
    async hardDeleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.hardDeleteUser(id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
    @Patch(':id/unban')
    @HttpCode(204)
    @ApiOperation({ summary: 'Unban a user (admin only)' })
    async unbanUser(@Param('id') id: string): Promise<void> {
        await this.userService.unbanUser(id);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Delete(':id/block')
    @HttpCode(204)
    @ApiOperation({ summary: 'Unblock a user' })
    async unblockUser(@Req() req, @Param('id') blockedId: string): Promise<void> {
        await this.userService.unblockUser(req.user.id, blockedId);
    }

    @UseGuards(JwtAuthGuard, NotSelfGuard)
    @Delete(':id/follow')
    @HttpCode(204)
    @ApiOperation({ summary: 'Unfollow a user' })
    async unfollowUser(@Param('id') targetUserId: string, @Req() req: any): Promise<void> {
        await this.userService.unfollowUser(req.user.id, targetUserId);
    }

    @UseGuards(JwtAuthGuard, SelfGuard, AdminGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update own user profile (self or admin)' })
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }
}
