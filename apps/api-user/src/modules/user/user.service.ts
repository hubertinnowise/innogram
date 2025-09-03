import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { DatabaseService } from '../../core/database/database.service';
import { PublicUserDto, UpdateUserDto } from './dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UserService {
    // DONE
    async banUser(id: string, dto: BanUserDto, adminId: string): Promise<void> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) throw new NotFoundException('User not found');

        await this.prisma.user.update({
            data: {
                bannedById: adminId,
                bannedOn: new Date(),
                bannedUntil: dto.bannedUntil ? new Date(dto.bannedUntil) : null,
                banReason: dto.banReason ?? null,
                isBanned: true,
            },
            where: { id },
        });
    }

    // DONE
    async blockUser(targetUserId: string, blockerId: string) {
        if (blockerId === targetUserId) {
            // Defense in depth (even if NotSelfGuard is used)
            throw new BadRequestException('You cannot block yourself');
        }

        const [blocker, blocked] = await Promise.all([
            this.prisma.user.findUnique({ select: { id: true }, where: { id: blockerId } }),
            this.prisma.user.findUnique({ select: { id: true }, where: { id: targetUserId } }),
        ]);

        if (!blocker || !blocked) {
            throw new NotFoundException('User not found');
        }

        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const block = await tx.userBlock.upsert({
                    create: { blockedId: targetUserId, blockerId },
                    select: { blockedId: true, blockerId: true, createdAt: true, id: true },
                    update: {},
                    where: { blockerId_blockedId: { blockedId: targetUserId, blockerId } }, // uses @@unique([blockerId, blockedId])
                });

                // Break any follow relationships in either direction
                await tx.follow.deleteMany({
                    where: {
                        OR: [
                            { followerId: blockerId, followingId: targetUserId },
                            { followerId: targetUserId, followingId: blockerId },
                        ],
                    },
                });

                return block;
            });

            return result;
        } catch (e: any) {
            // P2003 = FK constraint failed (shouldn't happen since we validated existence, but just in case)
            if (e?.code === 'P2003') throw new NotFoundException('User not found');
            throw e;
        }
    }

    constructor(
        private readonly prisma: DatabaseService,
        @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
    ) {}

    // pagination
    async findAll(): Promise<PublicUserDto[]> {
        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                _count: {
                    select: {
                        followers: true, // "Followers" relation
                        following: true, // "Following" relation
                    },
                },
                bio: true,
                createdAt: true,
                email: true,
                id: true,
                username: true,
            },
        });

        // map -> DTO
        return users.map((u) => ({
            bio: u.bio ?? undefined,
            createdAt: u.createdAt,
            email: u.email,
            followersCount: u._count.followers,
            followingCount: u._count.following,
            id: u.id,
            username: u.username,
        }));
    }

    // DONE
    async followUser(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new BadRequestException('You cannot follow yourself.');
        }

        // check blocks in either direction
        const block = await this.prisma.userBlock.findFirst({
            select: { blockedId: true, blockerId: true, id: true },
            where: {
                OR: [
                    { blockedId: followingId, blockerId: followerId },
                    { blockedId: followerId, blockerId: followingId },
                ],
            },
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
            create: { followerId, followingId },
            select: { createdAt: true, followerId: true, followingId: true },
            update: {}, // no-op if already following
            where: { followerId_followingId: { followerId, followingId } },
        });
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
                bio: true, // add to match PublicUserDto
                createdAt: true,
                email: true, // keep only if public
                id: true,
                username: true,
            },
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            bio: user.bio ?? undefined,
            createdAt: user.createdAt,
            email: user.email,
            followersCount: user._count.followers,
            followingCount: user._count.following,
            id: user.id,
            username: user.username,
        };
    }

    // no pagination
    async getUserFollowees(userId: string): Promise<PublicUserDto[]> {
        const follows = await this.prisma.follow.findMany({
            include: {
                following: {
                    select: {
                        _count: {
                            select: {
                                followers: true,
                                following: true,
                            },
                        },
                        bio: true,
                        createdAt: true,
                        email: true, // keep only if safe to expose
                        id: true,
                        username: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' }, // when the follow relation was created
            where: { followerId: userId },
        });

        return follows.map((f) => ({
            bio: f.following.bio ?? undefined,
            createdAt: f.following.createdAt,
            email: f.following.email,
            followersCount: f.following._count.followers,
            followingCount: f.following._count.following,
            id: f.following.id,
            username: f.following.username,
        }));
    }

    // no pagination
    async getUserFollowers(userId: string): Promise<PublicUserDto[]> {
        const follows = await this.prisma.follow.findMany({
            include: {
                follower: {
                    select: {
                        _count: {
                            select: {
                                followers: true,
                                following: true,
                            },
                        },
                        bio: true,
                        createdAt: true,
                        email: true, // keep only if safe to expose
                        id: true,
                        username: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' }, // order by Follow creation date
            where: { followingId: userId },
        });

        return follows.map((f) => ({
            bio: f.follower.bio ?? undefined,
            createdAt: f.follower.createdAt,
            email: f.follower.email,
            followersCount: f.follower._count.followers,
            followingCount: f.follower._count.following,
            id: f.follower.id,
            username: f.follower.username,
        }));
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
    }

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
            throw new Error('User not found');
        }

        if (!user.isBanned) {
            return false;
        }

        if (!user.bannedUntil) {
            return true;
        }

        return user.bannedUntil > new Date();
    }

    // this is complicated, leave for now
    async softDeleteUser(): Promise<PublicUserDto> {
        //dla usera i admina, jak snapchat
        return;
    }

    // DONE
    async unbanUser(id: string): Promise<void> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) throw new NotFoundException('User not found');

        if (!user.isBanned && !user.bannedUntil && !user.bannedOn && !user.banReason && !user.bannedById) {
            return;
        }

        await this.prisma.user.update({
            data: {
                bannedById: null,
                bannedOn: null,
                bannedUntil: null,
                banReason: null,
                isBanned: false,
            },
            where: { id },
        });
    }

    // DONE, blockedId kind of unnecessary
    async unblockUser(blockerId: string, blockedId: string): Promise<void> {
        const res = await this.prisma.userBlock.deleteMany({
            where: { blockedId, blockerId },
        });

        if (res.count === 0) {
            throw new NotFoundException('Block not found.');
        }
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
                    bio: dto.bio ?? undefined,
                    phoneNumber: dto.phoneNumber ?? undefined,
                    username: dto.username ?? undefined,
                },
                select: {
                    _count: { select: { followers: true, following: true } },
                    bio: true,
                    createdAt: true,
                    email: true,
                    id: true,
                    phoneNumber: true,
                    username: true,
                },
                where: { id: userId },
            });

            return {
                bio: updated.bio ?? undefined,
                createdAt: updated.createdAt,
                email: updated.email,
                followersCount: updated._count.followers,
                followingCount: updated._count.following,
                id: updated.id,
                phoneNumber: updated.phoneNumber,
                username: updated.username,
            };
        } catch (e: any) {
            if (e.code === 'P2002') {
                throw new ConflictException('Email, username, or phone already in use.');
            }
            throw e;
        }
    }
}
