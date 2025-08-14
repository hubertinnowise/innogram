import { 
    Controller, 
    Get, 
    Patch, 
    Delete, 
    Post, 
    Param, 
    Body, 
    ParseIntPipe 
  } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // GET /users/:id
    @Get(':id')
    async getUserDetails(@Param('id') id: string) {
        return this.userService.userDetails(id);
    }

    // PATCH /users/:id
    @Patch(':id')
    async editUserDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any, // Later replace with DTO
    ) {
        return this.userService.editUserDetails();
    }

    // DELETE /users/:id
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser();
    }

    // POST /users/:id/follow
    @Post(':id/follow')
    async followUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.followUser();
    }

    // POST /users/:id/unfollow
    @Post(':id/unfollow')
    async unfollowUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.unfollowUser();
    }

    // POST /users/:id/ban — to be implemented for admin
    @Post(':id/ban')
    async banUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.banUser();
    }

    // GET /users/:id/followers
    @Get(':id/followers')
    async getUserFollowers(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserFollowers();
    }

    // GET /users/:id/followees
    @Get(':id/followees')
    async getUserFollowees(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserFollowees();
    }
}
