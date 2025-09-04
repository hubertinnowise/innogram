import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'packages/jwt-auth.guard';

import { AdminGuard } from '@core/guards/admin-guard';
import { NotSelfGuard } from '@core/guards/not-self-guard';
import { SelfGuard } from '@core/guards/self-guard';
import { PublicUserDto, UpdateUserDto } from './dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserService } from './user.service';

import {
  FollowUserResponse,
  UnfollowUserResponse,
  BlockUserResponse,
  UnblockUserResponse,
  BanUserResponse,
  UnbanUserResponse,
  HardDeleteUserResponse,
} from './responses';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
  @Patch(':id/ban')
  @ApiOperation({ summary: 'Ban a user (admin only, cannot ban self)' })
  @ApiOkResponse({ description: 'User banned', type: BanUserResponse })
  async banUser(@Param('id') id: string, @Body() dto: BanUserDto, @Req() req) {
    const adminId = req.user.id;
    return this.userService.banUser(id, dto, adminId);
  }

  @UseGuards(JwtAuthGuard, NotSelfGuard)
  @Post(':id/block')
  @ApiOperation({ summary: 'Block a user' })
  @ApiOkResponse({ description: 'User blocked', type: BlockUserResponse })
  async blockUser(@Param('id') id: string, @Req() req: any) {
    const blockerId = req.user.id;
    return this.userService.blockUser(id, blockerId);
  }

  @UseGuards(JwtAuthGuard, NotSelfGuard)
  @Post(':id/follow')
  @HttpCode(201)
  @ApiOperation({ summary: 'Follow a user' })
  @ApiCreatedResponse({ description: 'Now following the user', type: FollowUserResponse })
  async followUser(@Param('id') targetUserId: string, @Req() req: any) {
    return this.userService.followUser(req.user.id, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get public user details' })
  @ApiOkResponse({ description: 'Public user details', type: PublicUserDto })
  async getUserDetails(@Param('id') id: string): Promise<PublicUserDto> {
    return this.userService.getUserDetails(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/following')
  @ApiOperation({ summary: 'List users that the given user follows' })
  @ApiOkResponse({ description: 'List of followees', type: PublicUserDto, isArray: true })
  async getUserFollowees(@Param('id') id: string): Promise<PublicUserDto[]> {
    return this.userService.getUserFollowees(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/followers')
  @ApiOperation({ summary: 'List followers of the given user' })
  @ApiOkResponse({ description: 'List of followers', type: PublicUserDto, isArray: true })
  async getUserFollowers(@Param('id') id: string): Promise<PublicUserDto[]> {
    return this.userService.getUserFollowers(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Hard delete a user (admin only)' })
  @ApiOkResponse({ description: 'User hard-deleted', type: HardDeleteUserResponse })
  async hardDeleteUser(@Param('id') id: string) {
    return this.userService.hardDeleteUser(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard, NotSelfGuard)
  @Patch(':id/unban')
  @ApiOperation({ summary: 'Unban a user (admin only)' })
  @ApiOkResponse({ description: 'User unbanned', type: UnbanUserResponse })
  async unbanUser(@Param('id') id: string) {
    return this.userService.unbanUser(id);
  }

  @UseGuards(JwtAuthGuard, NotSelfGuard)
  @Delete(':id/block')
  @ApiOperation({ summary: 'Unblock a user' })
  @ApiOkResponse({ description: 'User unblocked', type: UnblockUserResponse })
  async unblockUser(@Req() req, @Param('id') blockedId: string) {
    return this.userService.unblockUser(req.user.id, blockedId);
  }

  @UseGuards(JwtAuthGuard, NotSelfGuard)
  @Delete(':id/follow')
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiOkResponse({ description: 'Unfollowed successfully', type: UnfollowUserResponse })
  async unfollowUser(@Param('id') targetUserId: string, @Req() req: any) {
    return this.userService.unfollowUser(req.user.id, targetUserId);
  }

  @UseGuards(JwtAuthGuard, SelfGuard, AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update own user profile (self or admin)' })
  @ApiOkResponse({ description: 'Updated user profile', type: PublicUserDto })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
