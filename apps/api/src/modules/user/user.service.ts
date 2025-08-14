import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../core/database/database.service";
import { UserDetailsDto } from "./dto";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService
    ) {}

    async userDetails(userId: string): Promise<UserDetailsDto> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
            id: true,
            email: true,
            username: true,
            phoneNumber: true,
            createdAt: true,
            },
        });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        return user as UserDetailsDto;
    }
      

    async editUserDetails() {
        return;
    }

    async deleteUser() {
        return;
    }

    //only like logged in other user can do this
    async followUser() {
        return;
    }

    // same here
    async unfollowUser() {
        return;
    }

    //only available for an admin, to be 
    //implemented late
    async banUser() {
        return;
    }

    //get list of some user followers list
    async getUserFollowers() {
        return;
    }

    //get list of some user followees list
    async getUserFollowees() {
        return;
    }
}

// user info
// edit profile data
// delete profile
// follow / unfollow user
// ban
// view list of someone followers / followees
