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
    Query,
    Req,
    UseGuards
} from '@nestjs/common';

import { PublicUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { AdminGuard } from '../../core/guards/admin-guard';
import { BanUserDto } from './dto/ban-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    //jeszcze JWTGuard, przed AdminGuardem
    @UseGuards(AdminGuard)
    @Delete(':id')
    @HttpCode(204)
    async hardDeleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.hardDeleteUser(id);
    }

    // jwt guard
    @Get(':id')
    async getUserDetails(@Param('id') id: string): Promise<PublicUserDto> {
        return this.userService.getUserDetails(id);
    }

    // jwt guard
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }

    // jwt guard
    @UseGuards(AdminGuard)
    @Patch(':id/ban')
    async banUser(
        @Param('id') id: string,
        @Body() dto: BanUserDto,
        @Req() req,
    ): Promise<void> {
        await this.userService.banUser(id, dto, req.user.id); // pass banning admin id
    }

    // jwt guard 
    @UseGuards(AdminGuard)
    @Patch(':id/unban')
    @HttpCode(204)
    async unbanUser(
        @Param('id') id: string,
        @Req() req: any,
    ): Promise<void> {
        await this.userService.unbanUser(id, req.user.id);
    }

    // leave for now
    // @Delete(':id/soft')
    // @HttpCode(204)
    // async softDeleteUser(@Param('id') id: string): Promise<void> {
    //     // await this.userService.softDeleteUser(id);
    // }

    // auth guard, self guard
    // @UseGuards(JwtAuthGuard)
    @Post(':id/follow')
    @HttpCode(201) // Created (or 200 if you prefer)
    async followUser(
        @Param('id') targetUserId: string,
        @Req() req: any,
    ) {
        return this.userService.followUser(req.user.id, targetUserId);
    }

    // DELETE /users/:id/follow — unfollow target user
    // @UseGuards(JwtAuthGuard)
    @Delete(':id/follow')
    @HttpCode(204) // No Content
    async unfollowUser(
        @Param('id') targetUserId: string,
        @Req() req: any,
    ): Promise<void> {
        await this.userService.unfollowUser(req.user.id, targetUserId);
    }

    @Get(':id/following')
    async getUserFollowees(
        @Param('id') id: string,
    ): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowees(id);
    }

    @Get(':id/followers')
    async getUserFollowers(
        @Param('id') id: string,
    ): Promise<PublicUserDto[]> {
        return this.userService.getUserFollowers(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id/block')
    @HttpCode(204)
    async unblockUser(@Req() req, @Param('id') blockedId: string): Promise<void> {
        await this.userService.unblockUser(req.user.id, blockedId);
    }

    // self guard, jwt guard
    @Post(':id/block')
    async blockUser(@Param('id') targetUserId: string /*, @Req() req */) {
        // TODO: replace with your auth user id, e.g. req.user.id or @CurrentUser()
        const meId = 'REPLACE_ME';

        return this.userService.blockUser(meId, targetUserId);
    }
}