import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    Param,
    Patch, 
    Post,
    Query
  } from '@nestjs/common';
 
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
 
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
 
    @Post(':id/block')
    async blockUser(@Param('id') targetUserId: string /*, @Req() req */) {
      // TODO: replace with your auth user id, e.g. req.user.id or @CurrentUser()
      const meId = 'REPLACE_ME';
 
      return this.userService.blockUser(meId, targetUserId);
    }
 
    @Post(':id/follow')
    async followUser(@Param('id') targetUserId: string) {
        const meId = 'REPLACE_ME';
 
        if (meId === targetUserId) {
            throw new BadRequestException('You cannot follow yourself.');
        }
 
        return this.userService.followUser(meId, targetUserId);
    }
 
    @Get(':id')
    async getUserDetails(@Param('id') id: string) {
        return this.userService.getUserDetails(id);
    }
 
    // ten kursor double check 
    @Get(':id/following')
    async getUserFollowees(
        @Param('id') id: string,
        @Query('take') take?: string,
        @Query('cursor') cursor?: string,
        ): Promise<{ hasMore: boolean; items: { createdAt: Date; email: string; id: string; username: string; }[]; nextCursor: string; }> {
        const pageSize = Math.min(Math.max(Number(take ?? 20) || 20, 1), 100);
 
        let decodedCursor: { followerId: string; followingId: string } | undefined;
        if (cursor) {
            try {
            decodedCursor = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
            } catch {
            throw new BadRequestException('Invalid cursor');
            }
        }
 
        const { items, nextCursor } = await this.userService.getUserFollowees(id, pageSize, decodedCursor);
 
        return {
            hasMore: Boolean(nextCursor),
            items,
            nextCursor: nextCursor
            ? Buffer.from(JSON.stringify(nextCursor), 'utf8').toString('base64url')
            : undefined,
        };
    }
 
    // ten kursor double check 
    @Get(':id/followers')
    async getUserFollowers(
        @Param('id') id: string,
        @Query('take') take?: string,
        @Query('cursor') cursor?: string,
        ) {
        const pageSize = Math.min(Math.max(Number(take ?? 20) || 20, 1), 100);
 
        let decodedCursor: { followerId: string; followingId: string } | undefined;
        if (cursor) {
            try {
            decodedCursor = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
            } catch {
            throw new BadRequestException('Invalid cursor');
            }
        }
 
        const { items, nextCursor } = await this.userService.getUserFollowers(id, pageSize, decodedCursor);
 
        return {
            hasMore: Boolean(nextCursor),
            items,
            nextCursor: nextCursor
            ? Buffer.from(JSON.stringify(nextCursor), 'utf8').toString('base64url')
            : undefined,
        };
    }
 
    @Delete(':id')
    @HttpCode(204)
    async hardDeleteUser(@Param('id') id: string /* , @Req() req */): Promise<void> {
        // TODO: enforce admin auth here (e.g., RolesGuard or check req.user.role)
        await this.userService.hardDeleteUser(id);
        // 204 -> no response body
    }
 
    @Delete(':id/block')
    async unblockUser(@Param('id') targetUserId: string /* , @Req() req */) {
        // TODO: replace with your auth user id
        const meId = 'REPLACE_ME';
        await this.userService.unblockUser(meId, targetUserId);
        // explicit 204 No Content response
        return { message: 'Unblocked successfully', statusCode: 204 };
    }
 
    @Delete(':id/follow')
    async unfollowUser(@Param('id') targetUserId: string /* , @Req() req */) {
        // TODO: replace with your current user ID (e.g. req.user.id or @CurrentUser())
        const meId = 'REPLACE_ME';
 
        if (meId === targetUserId) {
            throw new BadRequestException('You cannot unfollow yourself.');
        }
 
        return this.userService.unfollowUser(meId, targetUserId);
    }
 
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        // TODO: ensure the caller is the same user or an admin
        // const meId = req.user.id; if (meId !== id && !isAdmin) throw new ForbiddenException();
        return this.userService.updateUser(id, dto);
    }
    // TODO: soft delete by user himself
    // TODO: ban / unban
    // TODO: get every user
}