import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../../core/database/database.service";
import { UserDetailsDto } from "./dto";
import { UpdateUserDto } from "./dto";
 
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService
    ) {}
 
    // TODO: tylko dla admina, BanUserDTO
    async banUser() {      
      /*
          tylko dla admina
 
          uzytkownik ktorego sie banuje powinien byc o tym powiadomiony,
          reason why, czas trwania, moze byc indefinite
 
          i niech to konto zostanie i tyle
 
          osobny model w bazie UserBan albo Ban
      */
      return;
    }
 
    //pomiedzy userami
    async blockUser(blockerId: string, blockedId: string) {
      if (blockerId === blockedId) {
        throw new BadRequestException('You cannot block yourself.');
      }
 
      // check if users exist
      const [blocker, blocked] = await Promise.all([
        this.prisma.user.findUnique({ select: { id: true }, where: { id: blockerId } }),
        this.prisma.user.findUnique({ select: { id: true }, where: { id: blockedId } }),
      ]);
      if (!blocker || !blocked) {
        throw new NotFoundException('User not found');
      }
 
      // create the block; @@unique([blockerId, blockedId]) prevents duplicates
      try {
        const block = await this.prisma.userBlock.create({
          data: { blockedId, blockerId },
          select: { blockedId: true, blockerId: true, createdAt: true, id: true },
        });
 
        // best-effort cleanup of follow edges in BOTH directions (not transactional)
        await this.prisma.follow.deleteMany({
          where: {
            OR: [
              { followerId: blockerId, followingId: blockedId },
              { followerId: blockedId, followingId: blockerId },
            ],
          },
        });
 
        return block;
      } catch (e: any) {
        if (e.code === 'P2002') {
          throw new ConflictException('Already blocked.');
        }
        throw e;
      }
    }
 
    //wszystkie usery, paginated, albo nwm, fixed ilosc jakas
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async findAll() {
 
    }
 
    async followUser(followerId: string, followingId: string) {
        // check if id's are equal (user cannot follow himself)
        if (followerId === followingId) {
            throw new BadRequestException('You cannot follow yourself.');
        }
 
        // check if users exist
        const [follower, following] = await Promise.all([
            this.prisma.user.findUnique({ select: { id: true }, where: { id: followerId } }),
            this.prisma.user.findUnique({ select: { id: true }, where: { id: followingId } }),
        ]);
        if (!follower || !following) {
            throw new NotFoundException('User not found');
        } 
        // create the link, prisma PK constraint ensures no duplicates
        try {
            const edge = await this.prisma.follow.create({
                data: { followerId, followingId },
            });
            return edge;
        } catch (e: any) {
            if (e.code === 'P2002') {
                throw new ConflictException('Already following this user.');
        }
            throw e;
        }     
    }
 
    // TODO: return as DTO 
    async getUserDetails(userId: string) {
        const user = await this.prisma.user.findUnique({
            select: {
                    _count: {
                    select: {
                        followers: true, // counts rows in Follow where followingId = userId
                        following: true, // counts rows in Follow where followerId = userId
                    },
                },
                    createdAt: true,
                    email: true,
                    id: true,
                    username: true,
            },
            where: { id: userId },
        });
 
        if (!user) {
            throw new NotFoundException('User not found');   
        }
 
        return {
            createdAt: user.createdAt,
            email: user.email,
            followersCount: user._count.followers,
            followingCount: user._count.following,
            id: user.id,
            username: user.username,
        };
  }
 
    // tutaj tez items jakos pod postacia dto zwracac
    async getUserFollowees(userId: string, take = 20, cursor?: { followerId: string; followingId: string }) {
      const follows = await this.prisma.follow.findMany({
        take,
        where: { followerId: userId },
        ...(cursor && { cursor: { followerId_followingId: cursor }, skip: 1 }),
        include: {
          following: {
            select: { createdAt: true, email: true, id: true, username: true },
          },
        },
        orderBy: [
          { createdAt: 'desc' },
          { followerId: 'asc' },
          { followingId: 'asc' },
        ],
      });
 
      return {
        items: follows.map(f => f.following),
        nextCursor: follows.length
          ? { followerId: follows.at(-1)!.followerId, followingId: follows.at(-1)!.followingId }
          : undefined,
      };
    }
 
    async getUserFollowers(
      userId: string,
      take = 20,
      cursor?: { followerId: string; followingId: string }
    ) {
      const follows = await this.prisma.follow.findMany({
        take,
        where: { followingId: userId },
        ...(cursor && { cursor: { followerId_followingId: cursor }, skip: 1 }),
        include: {
          follower: {
            select: { createdAt: true, email: true, id: true, username: true },
          },
        },
        orderBy: [
          { createdAt: 'desc' },
          { followerId: 'asc' },
          { followingId: 'asc' },
        ],
      });
 
      return {
        items: follows.map((f) => f.follower),
        nextCursor: follows.length
          ? { followerId: follows.at(-1)!.followerId, followingId: follows.at(-1)!.followingId }
          : undefined,
      };
    }
 
    // tylko dla admina, no i moze byc reused in softDelete
    async hardDeleteUser(userId: string): Promise<void> {
        const exists = await this.prisma.user.findUnique({
          select: { id: true },
          where: { id: userId },
        });
        if (!exists) {
            throw new NotFoundException('User not found');  
        } 
 
        /*
            ze tutaj tez trzeba okazji te wszystkie inne rzeczy pousuwac,
            relacje userBlock, follow itd
        */
    }
 
    async isUserBanned(userId: string): Promise<boolean> {
      const user = await this.prisma.user.findUnique({
        select: {
          bannedUntil: true,
          isBanned: true,
        },
        where: { id: userId },
      });
 
      if (!user) {
        throw new Error("User not found");
      }
 
      if (!user.isBanned) {
        return false;
      }
 
      if (!user.bannedUntil) {
        return true;
      }
 
      return user.bannedUntil > new Date();
    }
 
    // TODO: tutaj duzo roboty bedzie
    async softDeleteUser() : Promise<UserDetailsDto> {
      //dla usera i admina, jak snapchat
      return;
    }
 
    // ze tutaj sa issues z tym cursorem od paginacji
    // TODO: tylko dla admina, UnbanUserDTO
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async unbanUser() {
    }
 
    //pomiedzy userami 
    async unblockUser(blockerId: string, blockedId: string): Promise<void> {
      const res = await this.prisma.userBlock.deleteMany({
        where: { blockedId, blockerId },
      });
 
      if (res.count === 0) {
        throw new NotFoundException('Block not found.');
      }
      // return void -> controller can send 204 No Content
    }
 
    async unfollowUser(followerId: string, followingId: string) {
        // cannot unfollow yourself
        if (followerId === followingId) {
            throw new BadRequestException('You cannot unfollow yourself.');
        }
 
        // check if both users exist
        const [follower, following] = await Promise.all([
            this.prisma.user.findUnique({ select: { id: true }, where: { id: followerId } }),
            this.prisma.user.findUnique({ select: { id: true }, where: { id: followingId } }),
        ]);
        if (!follower || !following) {
            throw new NotFoundException('User not found');
        }
 
        // find the link
        const edge = await this.prisma.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId } },
        });
 
        if (!edge) {
            throw new NotFoundException('Follow relationship not found.');
        }
 
        // delete the link
        await this.prisma.follow.delete({
            where: { followerId_followingId: { followerId, followingId } },
        });
 
        return edge;
    }
 
    // TODO: return as DTO
    async updateUser(userId: string, dto: UpdateUserDto) {
        const exists = await this.prisma.user.findUnique({
          select: { id: true },
          where: { id: userId },
        });
        if (!exists) throw new NotFoundException('User not found');
 
        try {
          const updated = await this.prisma.user.update({
            data: {
              email: dto.email ?? undefined,
              phoneNumber: dto.phoneNumber ?? undefined,
              username: dto.username ?? undefined,
            },
            select: {
              _count: { select: { followers: true, following: true } },
              createdAt: true,
              email: true,
              id: true,
              phoneNumber: true,
              username: true,
            },
            where: { id: userId },
          });
 
          return {
            createdAt: updated.createdAt,
            email: updated.email,
            followersCount: updated._count.followers,
            followingCount: updated._count.following,
            id: updated.id,
            phoneNumber: updated.phoneNumber,
            username: updated.username,
          };
        } catch (e: any) {
          // Prisma unique constraint violation (email/username/phone)
          if (e.code === 'P2002') {
            // You can inspect e.meta?.target to tailor the message
            throw new ConflictException('Email, username, or phone already in use.');
          }
          throw e;
        }
      }
}