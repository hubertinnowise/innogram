import { 
    BadRequestException, 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post
  } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // POST /users/:id/ban — to be implemented for admin
    @Post(':id/ban')
    async banUser(@Param('id') id: string) {
        return await this.userService.banUser();
    }

    // tutaj tez trzeba sprawdzac identity, tylko user moze zmieniac swoje
    // dane, no i pewnie admin moze sprawdzac wszystkich
    // PATCH /users/:id
    // @Patch(':id')
    // @ApiOperation({ summary: 'Partially update user details' })
    // @ApiParam({
    //     name: 'id',
    //     description: 'User UUID',
    //     example: 'c7638a2d-bf5e-4f8a-aeb3-631b13a27a97',
    // })
    // @ApiOkResponse({ description: 'User updated' })
    // @ApiBadRequestResponse({ description: 'Invalid params/body' })
    // @ApiNotFoundResponse({ description: 'User not found' })
    // @UsePipes(new NonEmptyBodyPipe())
    // async editUserDetails(
    //     @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    //     @Body() dto: UpdateUserDto,
    // ) {
    //     return this.usersService.editUserDetails(id, dto);
    // }
    // }

    // DELETE /users/:id
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        // walidacja callera, tylko uzytkownik moze usunac samego siebie
        // przekazywac usera wolajacego i id uzytkownika do usuniecia,
        // albo id - id
        
        return this.userService.deleteUser(id);
    }

    // POST /users/:id/follow
    // tez dostepne dla usera, kto kogo, moze dto nawet
    @Post(':id/follow')
    async followUser(@Param('id', ParseIntPipe) id: number) {
        //nie mozna followowac samego siebie
        // return this.userService.followUser();
    }

    // POST /users/:id/unfollow
    // GET /users/:id
    @Get(':id')
    async getUserDetails(@Param('id') id: string) {
        return this.userService.userDetails(id);
    }

    
    // GET /users/:id/followees
    @Get(':id/followees')
    async getUserFollowees(@Param('id') id: string) {
        if (!/^\d+$/.test(id)) {
            throw new BadRequestException('User Id must be a non-negative integer.');
        }

        return await this.userService.getUserFollowees(id);
    }

    // GET /users/:id/followers
    @Get(':id/followers')
    async getUserFollowers(@Param('id') id: string) {
        if (!/^\d+$/.test(id)) {
            throw new BadRequestException('User Id must be a non-negative integer.');
        }
        
        return this.userService.getUserFollowers(id);
    }

    // ze to jest tylko dla userow dostepne, ci co maja, najpierw many to many zrobic
    @Post(':id/unfollow')
    async unfollowUser(@Param('id', ParseIntPipe) id: number) {
        //nie mozna odfollowowac samego siebie
        // return this.userService.unfollowUser();
    }
}

//patch users, get followers i get followees dzisiaj zrobic