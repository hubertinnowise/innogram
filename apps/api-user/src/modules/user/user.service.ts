import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

//zeby to dzialalo to musi byc proper .env setup itd, zeby migracje zrobic
// import UserRole from '../../../prisma/generated/client' // enum z usera
import { DatabaseService } from "../../core/database/database.service";
import { UserDetailsDto } from "./dto";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService
    ) {}

    //only available for an admin, to be implemented later
    async banUser() {
        // ze nie usuwac go zupelnie, niech ma jakies info o tym ze zostal zbanowany
        // ale ofc nie moze korzystac dalej z serwisu, moze dodac flage w modelu 
        return;
    }
      
    //jak sprawdzac requestora tutaj to tez bedzie parametrow wiecej
    async deleteUser(userId: string) : Promise<UserDetailsDto> {
        /*
            TODO!
            check czy requestor jest adminem lub userem, albo guardy jakies
        */
        const user = await this.prisma.user.findUnique({
            select: {
              createdAt: true,
              email: true,
              id: true,
              phoneNumber: true,
              username: true,
            },
            where: { id: userId },
        });

        if (!user) {
        throw new NotFoundException('User not found');
        }
        
        await this.prisma.user.delete({ where: { id: userId } });
        return user as UserDetailsDto;
    }

    async editUserDetails() {
        return;
    }

    // === Follow ===
    async followUser(followerId: string, followingId: string) {
    
        // Ensure both users exist (optional but clearer 404 than silent create failure)
        const [follower, following] = await Promise.all([
        this.prisma.user.findUnique({ select: { id: true }, where: { id: followerId } }),
        this.prisma.user.findUnique({ select: { id: true }, where: { id: followingId } }),
        ]);
        if (!follower || !following) throw new NotFoundException('User not found');

        //add user folow in prisma schema

        // try {
        // const link = await this.prisma.userFollow.create({
        //     data: { followerId, followingId },
        //     select: { createdAt: true, followerId: true, followingId: true },
        // });
        // return link;
        // } catch (e: any) {
        // if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        //     // unique constraint on (followerId, followingId)
        //     throw new ConflictException('Already following');
        // }
        // throw e;
        // }
    }

    // users that :userId follows
    async getUserFollowees(
        userId: string,
        take = 20,
        cursor?: { followerId: string; followingId: string },
    ) {
        const exists = await this.prisma.user.findUnique({ select: { id: true }, where: { id: userId } });
        if (!exists) throw new NotFoundException('User not found');

        //add user follow in prisma schema

        // const edges = await this.prisma.userFollow.findMany({
        //     take,
        //     where: { followerId: userId },
        //     ...(cursor ? { cursor: { followerId_followingId: cursor }, skip: 1 } : {}),
        //     include: {
        //         following: {
        //         select: { createdAt: true, email: true, id: true, username: true },
        //         },
        //     },
        //     orderBy: { createdAt: 'desc' },
        // });

        // const users = edges.map((e) => e.following);
        // const nextCursor =
        // edges.length === take
        //     ? { followerId: edges[edges.length - 1].followerId, followingId: edges[edges.length - 1].followingId }
        //     : undefined;

        // return { nextCursor, users };
    }

      // users who follow :userId
    async getUserFollowers(
            userId: string,
            take = 20,
            cursor?: { followerId: string; followingId: string }, // use last edge as cursor
        ) {
        // confirm user exists for nice 404
        const exists = await this.prisma.user.findUnique({ select: { id: true }, where: { id: userId } });
        if (!exists) throw new NotFoundException('User not found');

        // add user follow in prisma schema
        // const edges = await this.prisma.userFollow.findMany({
        //     take,
        //     where: { followingId: userId },
        //     ...(cursor ? { cursor: { followerId_followingId: cursor }, skip: 1 } : {}),
        //     include: {
        //         follower: {
        //         select: { createdAt: true, email: true, id: true, username: true },
        //         },
        //     },
        //     orderBy: { createdAt: 'desc' },
        // });

        // const users = edges.map((e) => e.follower);
        // const nextCursor =
        // edges.length === take
        //     ? { followerId: edges[edges.length - 1].followerId, followingId: edges[edges.length - 1].followingId }
        //     : undefined;

        // return { nextCursor, users };
    }

    //add user follow in prisma schema
    
    // === Unfollow ===
    // async unfollowUser(followerId: string, followingId: string) {
    //     try {
    //     await this.prisma.userFollow.delete({
    //         where: { followerId_followingId: { followerId, followingId } },
    //     });
    //     return { ok: true };
    //     } catch (e: any) {
    //     if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
    //         throw new NotFoundException('Follow relation not found');
    //     }
    //     throw e;
    //     }
    // }
    
    async userDetails(userId: string): Promise<UserDetailsDto> {
        const user = await this.prisma.user.findUnique({
            select: {
                createdAt: true,
                email: true,
                id: true,
                phoneNumber: true,
                username: true,
            },
            where: { id: userId },
        });

        // uwzgledniac jeszcze followees list i followers county 

        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user as UserDetailsDto;
    }   
}

// w modelu usera powinno by chyba ze lista userow albo user id's
// prywatne metody do liczenia count of user followees i user followers
// zeby je pozniej zawrzec w responsie user details