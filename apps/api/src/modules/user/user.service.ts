import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../core/database/database.service";
import { UserDetailsDto } from "./dto";

//zeby to dzialalo to musi byc proper .env setup itd, zeby migracje zrobic
import UserRole from '../../../prisma/generated/client'

import { PrismaClientKnownRequestError } from "apps/api/prisma/generated/client/runtime/library";

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

        // uwzgledniac jeszcze followees list i followers county 

        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user as UserDetailsDto;
    }
      
    async editUserDetails() {
        return;
    }

    //jak sprawdzac requestora tutaj to tez bedzie parametrow wiecej
    async deleteUser(userId: string) : Promise<UserDetailsDto> {
        /*
            TODO!
            check czy requestor jest adminem lub userem, albo guardy jakies
        */
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
        
        await this.prisma.user.delete({ where: { id: userId } });
        return user as UserDetailsDto;
    }

    // === Follow ===
    async followUser(followerId: string, followingId: string) {
    
        // Ensure both users exist (optional but clearer 404 than silent create failure)
        const [follower, following] = await Promise.all([
        this.prisma.user.findUnique({ where: { id: followerId }, select: { id: true } }),
        this.prisma.user.findUnique({ where: { id: followingId }, select: { id: true } }),
        ]);
        if (!follower || !following) throw new NotFoundException('User not found');

        try {
        const link = await this.prisma.userFollow.create({
            data: { followerId, followingId },
            select: { followerId: true, followingId: true, createdAt: true },
        });
        return link;
        } catch (e: any) {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
            // unique constraint on (followerId, followingId)
            throw new ConflictException('Already following');
        }
        throw e;
        }
    }

    // === Unfollow ===
    async unfollowUser(followerId: string, followingId: string) {
        try {
        await this.prisma.userFollow.delete({
            where: { followerId_followingId: { followerId, followingId } },
        });
        return { ok: true };
        } catch (e: any) {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
            throw new NotFoundException('Follow relation not found');
        }
        throw e;
        }
    }

      // users who follow :userId
    async getUserFollowers(
            userId: string,
            take = 20,
            cursor?: { followerId: string; followingId: string }, // use last edge as cursor
        ) {
        // confirm user exists for nice 404
        const exists = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!exists) throw new NotFoundException('User not found');

        const edges = await this.prisma.userFollow.findMany({
            where: { followingId: userId },
            take,
            ...(cursor ? { skip: 1, cursor: { followerId_followingId: cursor } } : {}),
            orderBy: { createdAt: 'desc' },
            include: {
                follower: {
                select: { id: true, username: true, email: true, createdAt: true },
                },
            },
        });

        const users = edges.map((e) => e.follower);
        const nextCursor =
        edges.length === take
            ? { followerId: edges[edges.length - 1].followerId, followingId: edges[edges.length - 1].followingId }
            : undefined;

        return { users, nextCursor };
    }

    // users that :userId follows
    async getUserFollowees(
        userId: string,
        take = 20,
        cursor?: { followerId: string; followingId: string },
    ) {
        const exists = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!exists) throw new NotFoundException('User not found');

        const edges = await this.prisma.userFollow.findMany({
            where: { followerId: userId },
            take,
            ...(cursor ? { skip: 1, cursor: { followerId_followingId: cursor } } : {}),
            orderBy: { createdAt: 'desc' },
            include: {
                following: {
                select: { id: true, username: true, email: true, createdAt: true },
                },
            },
        });

        const users = edges.map((e) => e.following);
        const nextCursor =
        edges.length === take
            ? { followerId: edges[edges.length - 1].followerId, followingId: edges[edges.length - 1].followingId }
            : undefined;

        return { users, nextCursor };
    }
    
    //only available for an admin, to be implemented later
    async banUser() {
        // ze nie usuwac go zupelnie, niech ma jakies info o tym ze zostal zbanowany
        // ale ofc nie moze korzystac dalej z serwisu, moze dodac flage w modelu 
        return;
    }   
}

// w modelu usera powinno by chyba ze lista userow albo user id's
// prywatne metody do liczenia count of user followees i user followers
// zeby je pozniej zawrzec w responsie user details