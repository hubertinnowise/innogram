import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor() {}

    async userDetails() {
        return;
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
