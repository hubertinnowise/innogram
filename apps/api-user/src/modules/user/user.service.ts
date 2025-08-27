import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { DatabaseService } from "../../core/database/database.service";
import { PublicUserDto, UpdateUserDto } from "./dto";
import { ClientProxy } from "@nestjs/microservices";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: DatabaseService,
    @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy
  ) { }

  // DONE
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

  // DONE
  async banUser(id: string, dto: BanUserDto, adminId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id },
      data: {
        isBanned: true,
        bannedOn: new Date(),
        bannedUntil: dto.bannedUntil ? new Date(dto.bannedUntil) : null,
        banReason: dto.banReason ?? null,
        bannedById: adminId,
      },
    });
  }

  // DONE
  async unbanUser(id: string, adminId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    if (!user.isBanned && !user.bannedUntil && !user.bannedOn && !user.banReason && !user.bannedById) {
      return;
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        isBanned: false,
        bannedOn: null,
        bannedUntil: null,
        banReason: null,
        bannedById: null,
      },
    });
  }

  // pay attention to related records while deleting, same with soft delete
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
        relacje userBlock, bo on cascad nie ma
    */
  }

  // this is complicated, leave for now
  async softDeleteUser(): Promise<PublicUserDto> {
    //dla usera i admina, jak snapchat
    return;
  }

  // DONE 
  async getUserDetails(userId: string): Promise<PublicUserDto> {
    const user = await this.prisma.user.findUnique({
      select: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        createdAt: true,
        email: true,      // keep only if public
        id: true,
        username: true,
        bio: true,        // add to match PublicUserDto
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
      bio: user.bio ?? undefined,
    };
  }

  // pagination
  async findAll(): Promise<PublicUserDto[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            followers: true, // "Followers" relation
            following: true, // "Following" relation 
          },
        },
      },
    });

    // map -> DTO
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      username: u.username,
      bio: u.bio ?? undefined,
      createdAt: u.createdAt,
      followersCount: u._count.followers,
      followingCount: u._count.following,
    }));
  }

  // DONE
  async updateUser(userId: string, dto: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({
      select: { id: true },
      where: { id: userId },
    });
    if (!exists) throw new NotFoundException('User not found');

    try {
      const updated = await this.prisma.user.update({
        data: {
          username: dto.username ?? undefined,
          phoneNumber: dto.phoneNumber ?? undefined,
          bio: dto.bio ?? undefined,
        },
        select: {
          _count: { select: { followers: true, following: true } },
          createdAt: true,
          email: true,
          id: true,
          phoneNumber: true,
          username: true,
          bio: true,
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
        bio: updated.bio ?? undefined,
      };
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Email, username, or phone already in use.');
      }
      throw e;
    }
  }

  // DONE
  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException('You cannot follow yourself.');
    }

    // check blocks in either direction
    const block = await this.prisma.userBlock.findFirst({
      where: {
        OR: [
          { blockerId: followerId, blockedId: followingId },
          { blockerId: followingId, blockedId: followerId },
        ],
      },
      select: { id: true, blockerId: true, blockedId: true },
    });
    if (block) {
      throw new ForbiddenException('Follow not allowed due to a block relationship.');
    }

    const [follower, following] = await Promise.all([
      this.prisma.user.findUnique({ select: { id: true }, where: { id: followerId } }),
      this.prisma.user.findUnique({ select: { id: true }, where: { id: followingId } }),
    ]);
    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.follow.upsert({
      where: { followerId_followingId: { followerId, followingId } },
      create: { followerId, followingId },
      update: {}, // no-op if already following
      select: { followerId: true, followingId: true, createdAt: true },
    });
  }

  // DONE
  async unfollowUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException('You cannot unfollow yourself.');
    }
  
    const [follower, following] = await Promise.all([
      this.prisma.user.findUnique({ select: { id: true }, where: { id: followerId } }),
      this.prisma.user.findUnique({ select: { id: true }, where: { id: followingId } }),
    ]);
    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }
  
    const res = await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
  
    if (res.count === 0) {
      throw new NotFoundException('Follow relationship not found.');
    }
  
    return { followerId, followingId };
  }

  // no pagination
  async getUserFollowees(userId: string): Promise<PublicUserDto[]> {
    const follows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            email: true,      // keep only if safe to expose
            bio: true,
            createdAt: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // when the follow relation was created
    });

    return follows.map(f => ({
      id: f.following.id,
      username: f.following.username,
      email: f.following.email,
      bio: f.following.bio ?? undefined,
      createdAt: f.following.createdAt,
      followersCount: f.following._count.followers,
      followingCount: f.following._count.following,
    }));
  }

  // no pagination
  async getUserFollowers(userId: string): Promise<PublicUserDto[]> {
    const follows = await this.prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,     // keep only if safe to expose
            bio: true,
            createdAt: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // order by Follow creation date
    });

    return follows.map(f => ({
      id: f.follower.id,
      username: f.follower.username,
      email: f.follower.email,
      bio: f.follower.bio ?? undefined,
      createdAt: f.follower.createdAt,
      followersCount: f.follower._count.followers,
      followingCount: f.follower._count.following,
    }));
  }

  // DONE
  async blockUser(blockerId: string, blockedId: string) {
    if (blockerId === blockedId) {
      throw new BadRequestException('You cannot block yourself.');
    }

    const [blocker, blocked] = await Promise.all([
      this.prisma.user.findUnique({ select: { id: true }, where: { id: blockerId } }),
      this.prisma.user.findUnique({ select: { id: true }, where: { id: blockedId } }),
    ]);
    if (!blocker || !blocked) {
      throw new NotFoundException('User not found');
    }

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const block = await tx.userBlock.upsert({
          where: { blockerId_blockedId: { blockerId, blockedId } }, // requires @@unique([blockerId, blockedId])
          create: { blockerId, blockedId },
          update: {},
          select: { id: true, blockerId: true, blockedId: true, createdAt: true },
        });

        await tx.follow.deleteMany({
          where: {
            OR: [
              { followerId: blockerId, followingId: blockedId },
              { followerId: blockedId, followingId: blockerId },
            ],
          },
        });

        return block;
      });

      return result;
    } catch (e: any) {
      if (e.code === 'P2003') throw new NotFoundException('User not found');
      throw e;
    }
  }

  // DONE
  async unblockUser(blockerId: string, blockedId: string): Promise<void> {
    const res = await this.prisma.userBlock.deleteMany({
      where: { blockedId, blockerId },
    });

    if (res.count === 0) {
      throw new NotFoundException('Block not found.');
    }
  }
}