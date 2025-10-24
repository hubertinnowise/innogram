import { DatabaseService } from '@core/database/database.service';
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PrismaErrorCode } from '@/core/enums/prisma-error-code.enum';
import { isPrismaKnownError } from '@/core/errors/is-prisma-known-error';

import { PublicUserDto, UpdateUserDto } from './dto';
import { BanUserDto } from './dto/ban-user.dto';
import {
    BanUserResponse,
    BlockUserResponse,
    FollowUserResponse,
    HardUserDeleteResponse,
    UnbanUserResponse,
    UnblockUserResponse,
    UnfollowUserResponse,
} from './responses';
import { IsUserBannedResponse } from './responses/is-user-banned.response';
import { ListUsersResponse } from './responses/list-user.response';
import { UpdateUserResponse } from './responses/update-user.response';

@Injectable()
export class UserService {
    async banUser(id: string, dto: BanUserDto, adminId: string): Promise<BanUserResponse> {
        const user = await this.prisma.user.findUnique({
            select: { id: true },
            where: { id },
        });
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
        this.logger.log(`Banned user ${id}.`);

        return {
            adminId: adminId,
            message: 'User banned.',
            success: true,
            userId: id,
        };
    }

    async blockUser(targetUserId: string, blockerId: string): Promise<BlockUserResponse> {
        if (blockerId === targetUserId) {
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
            await this.prisma.$transaction(async (tx) => {
                await tx.userBlock.upsert({
                    create: { blockedId: targetUserId, blockerId },
                    update: {},
                    where: { blockerId_blockedId: { blockedId: targetUserId, blockerId } }, // @@unique([blockerId, blockedId])
                });

                // break any follow relationships in either direction
                await tx.follow.deleteMany({
                    where: {
                        OR: [
                            { followerId: blockerId, followingId: targetUserId },
                            { followerId: targetUserId, followingId: blockerId },
                        ],
                    },
                });
            });

            this.logger.log(`User ${blockerId} blocked user ${targetUserId}.`);

            return {
                blockedId: targetUserId,
                blockerId: blockerId,
                message: 'User blocked.',
                success: true,
            };
        } catch (e: unknown) {
            if (isPrismaKnownError(e)) {
                if (e.code === PrismaErrorCode.ForeignKeyConstraintFailed) {
                    throw new NotFoundException('User not found');
                }
            }
            throw e;
        }
    }

    constructor(
        private readonly prisma: DatabaseService,
        @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
    ) {}

    async findAll(page = 1, limit = 20): Promise<{ total: number; users: PublicUserDto[] }> {
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
                select: {
                    _count: { select: { followers: true, following: true } },
                    bio: true,
                    createdAt: true,
                    id: true,
                    username: true,
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.user.count(),
        ]);

        const mappedUsers = users.map((u) => ({
            bio: u.bio ?? undefined,
            createdAt: u.createdAt,
            followersCount: u._count.followers,
            followingCount: u._count.following,
            id: u.id,
            username: u.username,
        }));

        return { total, users: mappedUsers };
    }

    async followUser(followerId: string, followingId: string): Promise<FollowUserResponse> {
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

        // idempotent: creates if not exists, no-op if already following
        await this.prisma.follow.upsert({
            create: { followerId, followingId },
            update: {},
            where: { followerId_followingId: { followerId, followingId } },
        });

        this.logger.log(`User ${followerId} followed user ${followingId}.`);

        return {
            followerId: followerId,
            message: 'Now following the user.',
            success: true,
            targetUserId: followingId,
        };
    }

    async getUserDetails(userId: string): Promise<PublicUserDto> {
        const user = await this.prisma.user.findUnique({
            select: {
                _count: { select: { followers: true, following: true } },
                bio: true,
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
            followersCount: user._count.followers,
            followingCount: user._count.following,
            id: user.id,
            username: user.username,
        };
    }

    async getUserFollowees(userId: string, page = 1, limit = 20): Promise<{ total: number; users: PublicUserDto[] }> {
        const [follows, total] = await Promise.all([
            this.prisma.follow.findMany({
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
                            id: true,
                            username: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' }, // when the follow relation was created
                skip: (page - 1) * limit,
                take: limit,
                where: { followerId: userId },
            }),
            this.prisma.follow.count({
                where: { followerId: userId },
            }),
        ]);

        const mappedUsers = follows.map((f) => ({
            bio: f.following.bio ?? undefined,
            createdAt: f.following.createdAt,
            followersCount: f.following._count.followers,
            followingCount: f.following._count.following,
            id: f.following.id,
            username: f.following.username,
        }));

        return { total, users: mappedUsers };
    }

    async getUserFollowers(userId: string, page = 1, limit = 20): Promise<{ total: number; users: PublicUserDto[] }> {
        const [follows, total] = await Promise.all([
            this.prisma.follow.findMany({
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
                skip: (page - 1) * limit,
                take: limit,
                where: { followingId: userId },
            }),
            this.prisma.follow.count({
                where: { followingId: userId },
            }),
        ]);

        const mappedUsers = follows.map((f) => ({
            bio: f.follower.bio ?? undefined,
            createdAt: f.follower.createdAt,
            followersCount: f.follower._count.followers,
            followingCount: f.follower._count.following,
            id: f.follower.id,
            username: f.follower.username,
        }));

        return { total, users: mappedUsers };
    }

    async hardDeleteUser(userId: string): Promise<HardUserDeleteResponse> {
        const exists = await this.prisma.user.findUnique({
            select: { id: true },
            where: { id: userId },
        });

        if (!exists) {
            throw new NotFoundException('User not found');
        }

        // cascading deletion set in prisma schema
        await this.prisma.user.delete({
            where: { id: userId },
        });

        return {
            message: 'User deleted.',
            success: true,
            userId,
        };
    }

    async isUserBanned(userId: string): Promise<IsUserBannedResponse> {
        const user = await this.prisma.user.findUnique({
            select: { bannedUntil: true, isBanned: true },
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.isBanned) {
            return { isBanned: false };
        }

        if (!user.bannedUntil) {
            return { isBanned: true };
        }

        return { isBanned: user.bannedUntil > new Date() };
    }

    private readonly logger = new Logger(UserService.name);

    async softDeleteUser(userId: string): Promise<PublicUserDto> {
        const user = await this.prisma.user.findUnique({
            select: { deletedAt: true, id: true },
            where: { id: userId },
        });
        if (!user) throw new NotFoundException('User not found');

        const updated = await this.prisma.user.update({
            data: {
                deletedAt: user.deletedAt ?? new Date(), // idempotent
            },
            select: {
                _count: { select: { followers: true, following: true } },
                bio: true,
                createdAt: true,
                email: true, // keep only if public
                id: true,
                phoneNumber: true,
                username: true,
            },
            where: { id: userId },
        });
        this.logger.log(`User ${userId} was set to be soft-deleted.`);

        return {
            bio: updated.bio ?? undefined,
            createdAt: updated.createdAt,
            followersCount: updated._count.followers,
            followingCount: updated._count.following,
            id: updated.id,
            username: updated.username,
        };
    }

    async unbanUser(id: string): Promise<UnbanUserResponse> {
        const user = await this.prisma.user.findUnique({
            select: {
                bannedById: true,
                bannedOn: true,
                bannedUntil: true,
                banReason: true,
                id: true,
                isBanned: true,
            },
            where: { id },
        });

        if (!user) throw new NotFoundException('User not found');

        // nothing to clear — already unbanned
        if (!user.isBanned && !user.bannedUntil && !user.bannedOn && !user.banReason && !user.bannedById) {
            return { message: 'User already unbanned.', success: true, userId: id };
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

        this.logger.log(`User ${id} got unbanned.`);

        return { message: 'User unbanned.', success: true, userId: id };
    }

    async unblockUser(blockerId: string, blockedId: string): Promise<UnblockUserResponse> {
        const res = await this.prisma.userBlock.deleteMany({
            where: { blockedId, blockerId },
        });

        if (res.count === 0) {
            throw new NotFoundException('Block not found.');
        }

        this.logger.log(`User ${blockerId} unblocked user ${blockedId}.`);

        return {
            blockedId,
            blockerId,
            message: 'User unblocked.',
            success: true,
        };
    }

    async unfollowUser(followerId: string, followingId: string): Promise<UnfollowUserResponse> {
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

        this.logger.log(`User ${followerId} unfollowed user ${followingId}.`);

        return {
            followerId,
            message: 'Unfollowed successfully.',
            success: true,
            targetUserId: followingId,
        };
    }

    async updateUser(userId: string, dto: UpdateUserDto): Promise<UpdateUserResponse> {
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

            this.logger.log(`User ${userId} updated details.`);

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
        } catch (e: unknown) {
            if (isPrismaKnownError(e)) {
                if (e.code === PrismaErrorCode.UniqueConstraintFailed) {
                    throw new ConflictException('Email, username, or phone already in use.');
                }
                if (e.code === PrismaErrorCode.RecordNotFound) {
                    throw new NotFoundException('User not found');
                }
            }
            throw e;
        }
    }
}
