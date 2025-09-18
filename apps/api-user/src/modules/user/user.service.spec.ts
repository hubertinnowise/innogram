import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';
import { DatabaseService } from '@core/database/database.service';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaErrorCode } from '@/core/enums /prisma-error-code.enum';

describe('UserService', () => {
    let service: UserService;
    let prismaService: any;
    let clientProxy: jest.Mocked<ClientProxy>;

    const mockUser = {
        id: 'user-1',
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Test bio',
        phoneNumber: '+1234567890',
        createdAt: new Date('2023-01-01'),
        isBanned: false,
        bannedUntil: null,
        bannedOn: null,
        banReason: null,
        bannedById: null,
        deletedAt: null,
        _count: {
            followers: 5,
            following: 3,
        },
    };

    const mockPublicUser = {
        id: 'user-1',
        username: 'testuser',
        bio: 'Test bio',
        createdAt: new Date('2023-01-01'),
        followersCount: 5,
        followingCount: 3,
    };

    beforeEach(async () => {
        const mockPrismaService = {
            user: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                count: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            follow: {
                findMany: jest.fn(),
                count: jest.fn(),
                upsert: jest.fn(),
                deleteMany: jest.fn(),
            },
            userBlock: {
                findFirst: jest.fn(),
                upsert: jest.fn(),
                deleteMany: jest.fn(),
            },
            $transaction: jest.fn(),
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
            banReason: 'Inappropriate behavior',
            bannedUntil: '2024-12-31T23:59:59.000Z',
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
                success: true,
                message: 'User banned.',
                adminId,
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.banUser('nonexistent', banUserDto, adminId))
                .rejects.toThrow(NotFoundException);
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
                userBlock: { upsert: jest.fn().mockResolvedValue({}) },
                follow: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
            };
            
            prismaService.$transaction.mockImplementation(async (callback) => {
                return await callback(mockTransaction);
            });

            const result = await service.blockUser(targetUserId, blockerId);

            expect(result).toEqual({
                success: true,
                message: 'User blocked.',
                blockerId,
                blockedId: targetUserId,
            });
        });

        it('should throw BadRequestException when trying to block self', async () => {
            const userId = 'user-1';

            await expect(service.blockUser(userId, userId))
                .rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException when blocker does not exist', async () => {
            const blockerId = 'nonexistent';
            const targetUserId = 'user-2';

            prismaService.user.findUnique
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ id: targetUserId });

            await expect(service.blockUser(targetUserId, blockerId))
                .rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException when target user does not exist', async () => {
            const blockerId = 'user-1';
            const targetUserId = 'nonexistent';

            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: blockerId })
                .mockResolvedValueOnce(null);

            await expect(service.blockUser(targetUserId, blockerId))
                .rejects.toThrow(NotFoundException);
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
                success: true,
                message: 'Now following the user.',
                followerId,
                targetUserId: followingId,
            });
        });

        it('should throw BadRequestException when trying to follow self', async () => {
            const userId = 'user-1';

            await expect(service.followUser(userId, userId))
                .rejects.toThrow(BadRequestException);
        });

        it('should throw ForbiddenException when users are blocked', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.userBlock.findFirst.mockResolvedValue({
                id: 'block-1',
                blockedId: followingId,
                blockerId: followerId,
            });

            await expect(service.followUser(followerId, followingId))
                .rejects.toThrow(ForbiddenException);
        });

        it('should throw NotFoundException when follower does not exist', async () => {
            const followerId = 'nonexistent';
            const followingId = 'user-2';

            prismaService.userBlock.findFirst.mockResolvedValue(null);
            prismaService.user.findUnique
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ id: followingId });

            await expect(service.followUser(followerId, followingId))
                .rejects.toThrow(NotFoundException);
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
                success: true,
                message: 'Unfollowed successfully.',
                followerId,
                targetUserId: followingId,
            });
        });

        it('should throw BadRequestException when trying to unfollow self', async () => {
            const userId = 'user-1';

            await expect(service.unfollowUser(userId, userId))
                .rejects.toThrow(BadRequestException);
        });

        it('should throw NotFoundException when follow relationship does not exist', async () => {
            const followerId = 'user-1';
            const followingId = 'user-2';

            prismaService.user.findUnique
                .mockResolvedValueOnce({ id: followerId })
                .mockResolvedValueOnce({ id: followingId });
            prismaService.follow.deleteMany.mockResolvedValue({ count: 0 });

            await expect(service.unfollowUser(followerId, followingId))
                .rejects.toThrow(NotFoundException);
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

            await expect(service.getUserDetails('nonexistent'))
                .rejects.toThrow(NotFoundException);
        });
    });

    describe('updateUser', () => {
        const updateDto: UpdateUserDto = {
            username: 'newusername',
            bio: 'New bio',
            phoneNumber: '+9876543210',
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

            await expect(service.updateUser('nonexistent', updateDto))
                .rejects.toThrow(NotFoundException);
        });

        it('should throw ConflictException on unique constraint violation', async () => {
            const prismaError = {
                code: PrismaErrorCode.UniqueConstraintFailed,
                message: 'Unique constraint failed',
            };
            prismaService.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prismaService.user.update.mockRejectedValue(prismaError);

            await expect(service.updateUser('user-1', updateDto))
                .rejects.toThrow(ConflictException);
        });
    });

    describe('findAll', () => {
        it('should return paginated users', async () => {
            const mockUsers = [mockUser];
            prismaService.user.findMany.mockResolvedValue(mockUsers);
            prismaService.user.count.mockResolvedValue(1);

            const result = await service.findAll(1, 10);

            expect(prismaService.user.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                orderBy: { createdAt: 'desc' },
                select: {
                    _count: { select: { followers: true, following: true } },
                    bio: true,
                    createdAt: true,
                    id: true,
                    username: true,
                },
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
            const mockFollows = [{
                follower: mockUser,
                createdAt: new Date(),
            }];
            prismaService.follow.findMany.mockResolvedValue(mockFollows);
            prismaService.follow.count.mockResolvedValue(1);

            const result = await service.getUserFollowers('user-1', 1, 10);

            expect(prismaService.follow.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
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
                where: { followingId: 'user-1' },
            });
            expect(result.users).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });

    describe('getUserFollowees', () => {
        it('should return paginated followees', async () => {
            const mockFollows = [{
                following: mockUser,
                createdAt: new Date(),
            }];
            prismaService.follow.findMany.mockResolvedValue(mockFollows);
            prismaService.follow.count.mockResolvedValue(1);

            const result = await service.getUserFollowees('user-1', 1, 10);

            expect(prismaService.follow.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
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
                where: { followerId: 'user-1' },
            });
            expect(result.users).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });

    describe('isUserBanned', () => {
        it('should return false for unbanned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                isBanned: false,
                bannedUntil: null,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: false });
        });

        it('should return true for permanently banned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                isBanned: true,
                bannedUntil: null,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: true });
        });

        it('should return true for temporarily banned user (not expired)', async () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 7);
            
            prismaService.user.findUnique.mockResolvedValue({
                isBanned: true,
                bannedUntil: futureDate,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: true });
        });

        it('should return false for temporarily banned user (expired)', async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 7);
            
            prismaService.user.findUnique.mockResolvedValue({
                isBanned: true,
                bannedUntil: pastDate,
            });

            const result = await service.isUserBanned('user-1');

            expect(result).toEqual({ isBanned: false });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.isUserBanned('nonexistent'))
                .rejects.toThrow(NotFoundException);
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
                success: true,
                message: 'User deleted.',
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.hardDeleteUser('nonexistent'))
                .rejects.toThrow(NotFoundException);
        });
    });

    describe('softDeleteUser', () => {
        it('should successfully soft delete user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                id: 'user-1',
                deletedAt: null,
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
                id: 'user-1',
                deletedAt: existingDeletedAt,
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

            await expect(service.softDeleteUser('nonexistent'))
                .rejects.toThrow(NotFoundException);
        });
    });

    describe('unbanUser', () => {
        it('should successfully unban user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                id: 'user-1',
                isBanned: true,
                bannedUntil: new Date(),
                bannedOn: new Date(),
                banReason: 'Test ban',
                bannedById: 'admin-1',
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
                success: true,
                message: 'User unbanned.',
                userId: 'user-1',
            });
        });

        it('should return success message for already unbanned user', async () => {
            prismaService.user.findUnique.mockResolvedValue({
                id: 'user-1',
                isBanned: false,
                bannedUntil: null,
                bannedOn: null,
                banReason: null,
                bannedById: null,
            });

            const result = await service.unbanUser('user-1');

            expect(prismaService.user.update).not.toHaveBeenCalled();
            expect(result).toEqual({
                success: true,
                message: 'User already unbanned.',
                userId: 'user-1',
            });
        });

        it('should throw NotFoundException when user does not exist', async () => {
            prismaService.user.findUnique.mockResolvedValue(null);

            await expect(service.unbanUser('nonexistent'))
                .rejects.toThrow(NotFoundException);
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
                success: true,
                message: 'User unblocked.',
                blockerId: 'user-1',
                blockedId: 'user-2',
            });
        });

        it('should throw NotFoundException when block does not exist', async () => {
            prismaService.userBlock.deleteMany.mockResolvedValue({ count: 0 });

            await expect(service.unblockUser('user-1', 'user-2'))
                .rejects.toThrow(NotFoundException);
        });
    });
});
