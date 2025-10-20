import { DatabaseService } from '@core/database/database.service';
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaErrorCode } from '@/core/enums /prisma-error-code.enum';

import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let prismaService: any;
    let clientProxy: jest.Mocked<ClientProxy>;

    const mockUser = {
        _count: {
            followers: 5,
            following: 3,
        },
        bannedById: null,
        bannedOn: null,
        bannedUntil: null,
        banReason: null,
        bio: 'Test bio',
        createdAt: new Date('2023-01-01'),
        deletedAt: null,
        email: 'test@example.com',
        id: 'user-1',
        isBanned: false,
        phoneNumber: '+1234567890',
        username: 'testuser',
    };

    const mockPublicUser = {
        bio: 'Test bio',
        createdAt: new Date('2023-01-01'),
        followersCount: 5,
        followingCount: 3,
        id: 'user-1',
        username: 'testuser',
    };

    beforeEach(async () => {
        const mockPrismaService = {
            $transaction: jest.fn(),
            follow: {
                count: jest.fn(),
                deleteMany: jest.fn(),
                findMany: jest.fn(),
                upsert: jest.fn(),
            },
            user: {
                count: jest.fn(),
                delete: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
            },
            userBlock: {
                deleteMany: jest.fn(),
                findFirst: jest.fn(),
                upsert: jest.fn(),
            },
        };

        const mockClientProxy = {
            emit: jest.fn(),
            send: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: DatabaseService,
                    useValue: mockPrismaService,
                },
                {
                    provide: 'RABBITMQ_CLIENT',
                    useValue: mockClientProxy,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        prismaService = module.get(DatabaseService);
        clientProxy = module.get('RABBITMQ_CLIENT');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('banUser', () => {
        const banUserDto: BanUserDto = {
            bannedUntil: '2024-12-31T23:59:59.000Z',
            banReason: 'Inappropriate behavior',
        };
        const adminId = 'admin-1';

        it('should successfully ban a user', async () => {
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.update.mockResolvedValue(mockUser);

            const result = await service.banUser('user-1', banUserDto, adminId);

            expect(prismaService.user.findUnique).toHaveBeenCalledWith({
                select: { id: true },
                where: { id: 'user-1' },
            });
            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    bannedById: adminId,
                    bannedOn: expect.any(Date),
                    bannedUntil: new Date(banUserDto.bannedUntil!),
                    banReason: banUserDto.banReason,
                    isBanned: true,
                },
                where: { id: 'user-1' },
            });
            expect(result).toEqual({
                adminId,
                message: 'User banned.',
                success: true,
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.banUser('nonexistent', banUserDto, adminId)).rejects.toThrow(NotFoundException);
        });

        it('should handle permanent ban when bannedUntil is not provided', async () => {
            const permanentBanDto = { banReason: 'Permanent ban' };
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.update.mockResolvedValue(mockUser);

            await service.banUser('user-1', permanentBanDto, adminId);

            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    bannedById: adminId,
                    bannedOn: expect.any(Date),
                    bannedUntil: null,
                    banReason: permanentBanDto.banReason,
                    isBanned: true,
                },
                where: { id: 'user-1' },
            });
        });
    });

    describe('blockUser', () => {
        it('should successfully block a user', async () => {
            const blockerId = 'user-1';
            const targetUserId = 'user-2';

            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: blockerId })
                .mockResolvedValueOnce({ id: targetUserId });

            const mockTransaction = {
                follow: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
                userBlock: { upsert: jest.fn().mockResolvedValue({}) },
            };

            prismaService.$transaction.mockImplementation(async (callback) => {
                return await callback(mockTransaction);
            });

            const result = await service.blockUser(targetUserId, blockerId);

            expect(result).toEqual({
                blockedId: targetUserId,
                blockerId,
                message: 'User blocked.',
                success: true,
            });
        });

        it('should throw BadRequestException when trying to block self', async () => {
            const userId = 'user-1';

            await expect(service.blockUser(userId, userId)).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException when blocker does not exist', async () => {
            const blockerId = 'nonexistent';
            const targetUserId = 'user-2';

            prismaService.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: targetUserId });

            await expect(service.blockUser(targetUserId, blockerId)).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException when target user does not exist', async () => {
            const blockerId = 'user-1';
            const targetUserId = 'nonexistent';

            prismaService.user.findUnique.mockResolvedValueOnce({ id: blockerId }).mockResolvedValueOnce(null);

            await expect(service.blockUser(targetUserId, blockerId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('followUser', () => {
        it('should successfully follow a user', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.userBlock.findFirst.mockResolvedValue(null);
            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: followerId })
                .mockResolvedValueOnce({ id: followingId });
            prismaService.follow.upsert.mockResolvedValue({});

            const result = await service.followUser(followerId, followingId);

            expect(prismaService.follow.upsert).toHaveBeenCalledWith({
                create: { followerId, followingId },
                update: {},
                where: { followerId_followingId: { followerId, followingId } },
            });
            expect(result).toEqual({
                followerId,
                message: 'Now following the user.',
                success: true,
                targetUserId: followingId,
            });
        });

        it('should throw BadRequestException when trying to follow self', async () => {
            const userId = 'user-1';

            await expect(service.followUser(userId, userId)).rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException when users are blocked', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.userBlock.findFirst.mockResolvedValue({
                blockedId: followingId,
                blockerId: followerId,
                id: 'block-1',
            });

            await expect(service.followUser(followerId, followingId)).rejects.toThrow(ForbiddenException);
        });

        it('should throw NotFoundException when follower does not exist', async () => {
            const followerId = 'nonexistent';
            const followingId = 'user-2';

            prismaService.userBlock.findFirst.mockResolvedValue(null);
            prismaService.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: followingId });

            await expect(service.followUser(followerId, followingId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('unfollowUser', () => {
        it('should successfully unfollow a user', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: followerId })
                .mockResolvedValueOnce({ id: followingId });
            prismaService.follow.deleteMany.mockResolvedValue({ count: 1 });

            const result = await service.unfollowUser(followerId, followingId);

            expect(prismaService.follow.deleteMany).toHaveBeenCalledWith({
                where: { followerId, followingId },
            });
            expect(result).toEqual({
                followerId,
                message: 'Unfollowed successfully.',
                success: true,
                targetUserId: followingId,
            });
        });

        it('should throw BadRequestException when trying to unfollow self', async () => {
            const userId = 'user-1';

            await expect(service.unfollowUser(userId, userId)).rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException when follow relationship does not exist', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: followerId })
                .mockResolvedValueOnce({ id: followingId });
            prismaService.follow.deleteMany.mockResolvedValue({ count: 0 });

            await expect(service.unfollowUser(followerId, followingId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getUserDetails', () => {
        it('should return user details successfully', async () => {
            prismaService.user.findUnique.mockResolvedValue(mockUser);

            const result = await service.getUserDetails('user-1');

            expect(prismaService.user.findUnique).toHaveBeenCalledWith({
                select: {
                    _count: { select: { followers: true, following: true } },
                    bio: true,
                    createdAt: true,
                    email: true,
                    id: true,
                    username: true,
                },
                where: { id: 'user-1' },
            });
            expect(result).toEqual(mockPublicUser);
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.getUserDetails('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateUser', () => {
        const updateDto: UpdateUserDto = {
            bio: 'New bio',
            phoneNumber: '+9876543210',
            username: 'newusername',
        };

        it('should successfully update user', async () => {
            const updatedUser = { ...mockUser, ...updateDto };
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.update.mockResolvedValue(updatedUser);

            const result = await service.updateUser('user-1', updateDto);

            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    bio: updateDto.bio,
                    phoneNumber: updateDto.phoneNumber,
                    username: updateDto.username,
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
                where: { id: 'user-1' },
            });
            expect(result.id).toBe('user-1');
            expect(result.username).toBe(updateDto.username);
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.updateUser('nonexistent', updateDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw ConflictException on unique constraint violation', async () => {
            const prismaError = {
                code: PrismaErrorCode.UniqueConstraintFailed,
                message: 'Unique constraint failed',
            };
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.update.mockRejectedValue(prismaError);

            await expect(service.updateUser('user-1', updateDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return paginated users', async () => {
            const mockUsers = [mockUser];
            prismaService.user.findMany.mockResolvedValue(mockUsers);
            prismaService.user.count.mockResolvedValue(1);

            const result = await service.findAll(1, 10);

            expect(prismaService.user.findMany).toHaveBeenCalledWith({
                orderBy: { createdAt: 'desc' },
                select: {
                    _count: { select: { followers: true, following: true } },
                    bio: true,
                    createdAt: true,
                    id: true,
                    username: true,
                },
                skip: 0,
                take: 10,
            });
            expect(result.users).toHaveLength(1);
            expect(result.total).toBe(1);
        });

        it('should handle empty results', async () => {
            prismaService.user.findMany.mockResolvedValue([]);
            prismaService.user.count.mockResolvedValue(0);

            const result = await service.findAll(1, 10);

            expect(result.users).toHaveLength(0);
            expect(result.total).toBe(0);
        });
    });

    describe('getUserFollowers', () => {
        it('should return paginated followers', async () => {
            const mockFollows = [
                {
                    createdAt: new Date(),
                    follower: mockUser,
                },
            ];
            prismaService.follow.findMany.mockResolvedValue(mockFollows);
            prismaService.follow.count.mockResolvedValue(1);

            const result = await service.getUserFollowers('user-1', 1, 10);

            expect(prismaService.follow.findMany).toHaveBeenCalledWith({
                include: {
                    follower: {
                        select: {
                            _count: { select: { followers: true, following: true } },
                            bio: true,
                            createdAt: true,
                            email: true,
                            id: true,
                            username: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 10,
                where: { followingId: 'user-1' },
            });
            expect(result.users).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });

    describe('getUserFollowees', () => {
        it('should return paginated followees', async () => {
            const mockFollows = [
                {
                    createdAt: new Date(),
                    following: mockUser,
                },
            ];
            prismaService.follow.findMany.mockResolvedValue(mockFollows);
            prismaService.follow.count.mockResolvedValue(1);

            const result = await service.getUserFollowees('user-1', 1, 10);

            expect(prismaService.follow.findMany).toHaveBeenCalledWith({
                include: {
                    following: {
                        select: {
                            _count: { select: { followers: true, following: true } },
                            bio: true,
                            createdAt: true,
                            id: true,
                            username: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 10,
                where: { followerId: 'user-1' },
            });
            expect(result.users).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });

    describe('isUserBanned', () => {
        it('should return false for unbanned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                bannedUntil: null,
                isBanned: false,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: false });
        });

        it('should return true for permanently banned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                bannedUntil: null,
                isBanned: true,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: true });
        });

        it('should return true for temporarily banned user (not expired)', async () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7);

            prismaService.user.findUnique.mockResolvedValue({
                bannedUntil: futureDate,
                isBanned: true,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: true });
        });

        it('should return false for temporarily banned user (expired)', async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 7);

            prismaService.user.findUnique.mockResolvedValue({
                bannedUntil: pastDate,
                isBanned: true,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: false });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.isUserBanned('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('hardDeleteUser', () => {
        it('should successfully delete user', async () => {
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.delete.mockResolvedValue(mockUser);

            const result = await service.hardDeleteUser('user-1');

            expect(prismaService.user.delete).toHaveBeenCalledWith({
                where: { id: 'user-1' },
            });
            expect(result).toEqual({
                message: 'User deleted.',
                success: true,
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.hardDeleteUser('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('softDeleteUser', () => {
        it('should successfully soft delete user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                deletedAt: null,
                id: 'user-1',
            });
            prismaService.user.update.mockResolvedValue(mockUser);

            const result = await service.softDeleteUser('user-1');

            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    deletedAt: expect.any(Date),
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
                where: { id: 'user-1' },
            });
            expect(result.id).toBe('user-1');
        });

        it('should be idempotent for already soft-deleted user', async () => {
            const existingDeletedAt = new Date('2023-01-01');
            prismaService.user.findUnique.mockResolvedValue({
                deletedAt: existingDeletedAt,
                id: 'user-1',
            });
            prismaService.user.update.mockResolvedValue(mockUser);

            await service.softDeleteUser('user-1');

            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    deletedAt: existingDeletedAt,
                },
                select: expect.any(Object),
                where: { id: 'user-1' },
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.softDeleteUser('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('unbanUser', () => {
        it('should successfully unban user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                bannedById: 'admin-1',
                bannedOn: new Date(),
                bannedUntil: new Date(),
                banReason: 'Test ban',
                id: 'user-1',
                isBanned: true,
            });
            prismaService.user.update.mockResolvedValue(mockUser);

            const result = await service.unbanUser('user-1');

            expect(prismaService.user.update).toHaveBeenCalledWith({
                data: {
                    bannedById: null,
                    bannedOn: null,
                    bannedUntil: null,
                    banReason: null,
                    isBanned: false,
                },
                where: { id: 'user-1' },
            });
            expect(result).toEqual({
                message: 'User unbanned.',
                success: true,
                userId: 'user-1',
            });
        });

        it('should return success message for already unbanned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                bannedById: null,
                bannedOn: null,
                bannedUntil: null,
                banReason: null,
                id: 'user-1',
                isBanned: false,
            });

            const result = await service.unbanUser('user-1');

            expect(prismaService.user.update).not.toHaveBeenCalled();
            expect(result).toEqual({
                message: 'User already unbanned.',
                success: true,
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.unbanUser('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });

    describe('unblockUser', () => {
        it('should successfully unblock user', async () => {
            prismaService.userBlock.deleteMany.mockResolvedValue({ count: 1 });

            const result = await service.unblockUser('user-1', 'user-2');

            expect(prismaService.userBlock.deleteMany).toHaveBeenCalledWith({
                where: { blockedId: 'user-2', blockerId: 'user-1' },
            });
            expect(result).toEqual({
                blockedId: 'user-2',
                blockerId: 'user-1',
                message: 'User unblocked.',
                success: true,
            });
        });

        it('should throw NotFoundException when block does not exist', async () => {
            prismaService.userBlock.deleteMany.mockResolvedValue({ count: 0 });

            await expect(service.unblockUser('user-1', 'user-2')).rejects.toThrow(NotFoundException);
        });
    });
});
