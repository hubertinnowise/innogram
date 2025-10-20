import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
    CommentPostResponse,
    CreatePostResponse,
    EditPostResponse,
    GetPostResponse,
    LikePostResponse,
    RemovePostCommentResponse,
    RemovePostResponse,
    UnlikePostResponse,
    UserFeedResponse,
    UserPostResponse,
    LikeCommentResponse,
    UnlikeCommentResponse,
    LikeCommentReplyResponse,
    UnlikeCommentReplyResponse,
    GetPostCommentsResponse,
    GetPostCommentRepliesResponse,
    RemoveCommentReplyResponse,
    GetPostLikesResponse,
    GetCommentLikesResponse,
    GetCommentReplyLikesResponse,
    AddCommentReplyResponse,
} from './responses';

import { CommentPostDto, CreatePostDto, EditPostDto, PostCommentDto, PublicPostDto } from './dto';
import { DatabaseService } from '@/core/database/database.service';
import { PublicPostMediaDto } from './dto/public-post-media.dto';
import { PostMediaType } from '@prisma/client-post';
import { PostCommentReplyDto } from './dto/post-comment-reply.dto';
import { PublicUserLiteDto } from './dto/public-user-lite.dto';
import { AddCommentReplyDto } from './dto/add-comment-reply.dto';

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(
        private readonly prisma: DatabaseService,
        @Inject('RABBITMQ_CLIENT') private readonly rabbitClient: ClientProxy,
    ) {}

    async likePost(postId: string, userId: string): Promise<LikePostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post || post.deletedAt) {
            throw new Error('Post not found or has been deleted.');
        }

        // TODO: Add deletedAt/bannedAt checks for user if you have those fields
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new Error('User not found.');
        }

        const { alreadyExisted, likesCount } = await this.prisma.$transaction(async (tx) => {
            const res = await tx.postLike.createMany({
                data: { userId, postId },
                skipDuplicates: true,
            });
            const alreadyExisted = res.count === 0;
            const likesCount = await tx.postLike.count({ where: { postId } });
            return { alreadyExisted, likesCount };
        });

        // Emit like event to RabbitMQ
        // this.rabbitClient.emit('post_liked', {
        //     postId,
        //     userId,
        //     likesCount,
        //     alreadyExisted,
        // });

        return {
            success: true,
            message: alreadyExisted ? 'Post already liked.' : 'Post liked.',
            postId,
            userId,
            likesCount,
        };
    }

    async unlikePost(postId: string, userId: string): Promise<UnlikePostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            throw new Error('Post not found or has been deleted.');
        }

        // TODO: Add deletedAt/bannedAt checks for user if you have those fields
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new Error('User not found.');
        }

        const { removed, likesCount } = await this.prisma.$transaction(async (tx) => {
            const res = await tx.postLike.deleteMany({
                where: { userId, postId },
            });

            const likesCount = await tx.postLike.count({ where: { postId } });
            return { removed: res.count > 0, likesCount };
        });

        return {
            success: true,
            message: removed ? 'Post unliked.' : 'Post was not liked.',
            postId,
            userId,
            likesCount,
        };
    }

    //DONE ew jakis try catch PrismaError handling
    async commentPost(postId: string, userId: string, dto: CommentPostDto): Promise<CommentPostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            throw new Error('Post not found or has been deleted.');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
            select: { id: true },
        });
        if (!user) {
            throw new Error('User not found.');
        }

        const { commentId, commentsCount } = await this.prisma.$transaction(async (tx) => {
            const comment = await tx.comment.create({
                data: {
                    postId,
                    authorId: userId,
                    content: dto.content.trim(),
                },
                select: { id: true },
            });

            const commentsCount = await tx.comment.count({ where: { postId } });
            return { commentId: comment.id, commentsCount };
        });

        return {
            success: true,
            message: 'Comment added.',
            postId,
            userId,
            commentId,
            commentsCount,
        };
    }

    // SelfGuard, try catch PrismaError handling
    async removePostComment(postId: string, commentId: string, userId: string): Promise<RemovePostCommentResponse> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                postId: true,
                authorId: true,
                post: { select: { id: true, authorId: true, deletedAt: true } },
            },
        });

        if (!comment || comment.postId !== postId) {
            return { success: false, message: 'Comment not found.' };
        }
        if (comment.post.deletedAt) {
            return { success: false, message: 'Post has been deleted.' };
        }

        const { commentsCount } = await this.prisma.$transaction(async (tx) => {
            await tx.comment.delete({ where: { id: commentId } });
            const commentsCount = await tx.comment.count({
                where: { postId },
            });
            return { commentsCount };
        });

        return {
            success: true,
            message: 'Comment removed.',
            postId,
            commentId,
            userId,
            commentsCount,
        };
    }

    // TODO: Implement user feed algorithm
    async getUserFeed(userId: string, limit: number = 20): Promise<UserFeedResponse> {
        return {
            success: true,
            userId,
            total: 0,
            posts: [],
        };
    }

    async getUserPosts(userId: string, page: number = 1, limit: number = 20): Promise<UserPostResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            return {
                success: false,
                userId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                posts: [],
            } as UserPostResponse;
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [posts, total] = await Promise.all([
            this.prisma.post.findMany({
                where: { authorId: userId, deletedAt: null },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    authorId: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    media: {
                        select: {
                            id: true,
                            type: true,
                            url: true,
                            position: true,
                            width: true,
                            height: true,
                            durationMs: true,
                        },
                        orderBy: { position: 'asc' },
                    },
                    _count: {
                        select: { likes: true, comments: true },
                    },
                },
                skip,
                take: normalizedLimit,
            }),
            this.prisma.post.count({ where: { authorId: userId, deletedAt: null } }),
        ]);

        const dtoList: PublicPostDto[] = posts.map((p) => ({
            id: p.id,
            authorId: p.authorId,
            content: p.content,
            media: p.media.map<PublicPostMediaDto>((m) => ({
                id: m.id,
                // m.type is PostMediaType; cast to the DTO union - identical literal values
                type: m.type as unknown as PublicPostMediaDto['type'],
                url: m.url ?? undefined,
                position: m.position,
                width: m.width ?? undefined,
                height: m.height ?? undefined,
                durationMs: m.durationMs ?? undefined,
            })),
            likesCount: p._count.likes,
            commentsCount: p._count.comments,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
        }));

        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            userId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            posts: dtoList,
        };
    }

    async getPost(postId: string): Promise<GetPostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                authorId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                media: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                        position: true,
                        width: true,
                        height: true,
                        durationMs: true,
                    },
                    orderBy: { position: 'asc' },
                },
                _count: {
                    select: { likes: true, comments: true },
                },
            },
        });

        if (!post || post.deletedAt) {
            return { success: false, message: 'Post not found or deleted.' };
        }

        const dto: PublicPostDto = {
            id: post.id,
            authorId: post.authorId,
            content: post.content,
            media: post.media.map((m) => ({
                id: m.id,
                type: m.type as PublicPostDto['media'][number]['type'], // narrow to DTO union
                url: m.url ?? undefined,
                position: m.position,
                width: m.width ?? undefined,
                height: m.height ?? undefined,
                durationMs: m.durationMs ?? undefined,
            })),
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };

        return { success: true, post: dto };
    }

    // TO BE CHECKED SelfGuard, dto
    async createPost(authorId: string, dto: CreatePostDto): Promise<CreatePostResponse> {
        const user = await this.prisma.user.findUnique({ where: { id: authorId }, select: { id: true } });
        if (!user) throw new Error('User not found.');

        // Inline normalize: sort by provided position (if any), then reindex 0..n and default bucket.
        const mediaData =
            dto.media && dto.media.length
                ? dto.media
                      .slice()
                      .sort((a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER))
                      .map((m, i) => ({
                          type: m.type,
                          bucket: m.bucket ?? 'posts',
                          objectKey: m.objectKey,
                          url: m.url,
                          position: i,
                          width: m.width,
                          height: m.height,
                          durationMs: m.durationMs,
                      }))
                : [];

        const created = await this.prisma.post.create({
            data: {
                authorId,
                content: dto.content,
                // media: mediaData.length ? { create: mediaData } : undefined,
            },
            select: {
                id: true,
                authorId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                media: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                        position: true,
                        width: true,
                        height: true,
                        durationMs: true,
                    },
                    orderBy: { position: 'asc' },
                },
            },
        });

        const postDto: PublicPostDto = {
            id: created.id,
            authorId: created.authorId,
            content: created.content,
            media: created.media.map<PublicPostMediaDto>((m) => ({
                id: m.id,
                type: m.type as unknown as PublicPostMediaDto['type'],
                url: m.url ?? undefined,
                position: m.position,
                width: m.width ?? undefined,
                height: m.height ?? undefined,
                durationMs: m.durationMs ?? undefined,
            })),
            likesCount: 0,
            commentsCount: 0,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };

        // Emit post creation event to RabbitMQ
        // this.rabbitClient.emit('post_created', {
        //     postId: created.id,
        //     authorId: authorId,
        //     content: dto.content,
        //     createdAt: created.createdAt,
        // });

        return {
            success: true,
            message: 'Post created.',
            postId: created.id,
            post: postDto,
        };
    }

    // TO BE CHECKED
    async editPost(postId: string, userId: string, dto: EditPostDto): Promise<EditPostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, authorId: true, deletedAt: true },
        });

        if (!post) throw new Error('Post not found.');
        if (post.deletedAt) throw new Error('Post has been deleted.');
        if (post.authorId !== userId) throw new Error('Not authorized to edit this post.');

        if (dto.media) {
            // Replace-all semantics for media + optional content update in one TX
            const mediaData = dto.media.length
                ? dto.media
                      .slice()
                      .sort((a, b) => (a.position ?? Number.MAX_SAFE_INTEGER) - (b.position ?? Number.MAX_SAFE_INTEGER))
                      .map((m, i) => ({
                          postId,
                          type: m.type,
                          bucket: m.bucket ?? 'posts',
                          objectKey: m.objectKey,
                          url: m.url,
                          position: i,
                          width: m.width,
                          height: m.height,
                          durationMs: m.durationMs,
                      }))
                : [];

            await this.prisma.$transaction(async (tx) => {
                if (typeof dto.content === 'string') {
                    await tx.post.update({ where: { id: postId }, data: { content: dto.content } });
                }
                await tx.postMedia.deleteMany({ where: { postId } });
                if (mediaData.length) {
                    // await tx.postMedia.createMany({ data: mediaData });
                }
            });
        } else if (typeof dto.content === 'string') {
            await this.prisma.post.update({ where: { id: postId }, data: { content: dto.content } });
        }

        // Re-fetch with counts for the response
        const updated = await this.prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                authorId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                media: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                        position: true,
                        width: true,
                        height: true,
                        durationMs: true,
                    },
                    orderBy: { position: 'asc' },
                },
                _count: { select: { likes: true, comments: true } },
            },
        });
        if (!updated) throw new Error('Post not found after update.');

        const postDto: PublicPostDto = {
            id: updated.id,
            authorId: updated.authorId,
            content: updated.content,
            media: updated.media.map<PublicPostMediaDto>((m) => ({
                id: m.id,
                type: m.type as unknown as PublicPostMediaDto['type'],
                url: m.url ?? undefined,
                position: m.position,
                width: m.width ?? undefined,
                height: m.height ?? undefined,
                durationMs: m.durationMs ?? undefined,
            })),
            likesCount: updated._count.likes,
            commentsCount: updated._count.comments,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };

        return {
            success: true,
            message: 'Post updated.',
            postId,
            post: postDto,
        };
    }

    // SelfGuard dto moze
    async removePost(postId: string, userId: string): Promise<RemovePostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, authorId: true, deletedAt: true },
        });

        if (!post) {
            return { success: false, message: 'Post not found.' };
        }
        if (post.deletedAt) {
            return {
                success: false,
                message: 'Post already removed.',
                postId,
                userId,
                deletedAt: post.deletedAt,
            };
        }

        // guard, check autorstwa w kontrollerze
        // if (post.authorId !== userId) {
        //     return { success: false, message: 'Not authorized to remove this post.' };
        // }

        const now = new Date();
        await this.prisma.post.update({
            where: { id: postId },
            data: { deletedAt: now },
        });

        return {
            success: true,
            message: 'Post removed.',
            postId,
            userId,
            deletedAt: now,
        };
    }

    async likeComment(commentId: string, userId: string): Promise<LikeCommentResponse> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true },
        });
        if (!comment) {
            return { success: false, message: 'Comment not found.', commentId, userId, likesCount: 0 };
        }

        const { likesCount, createdNew } = await this.prisma.$transaction(async (tx) => {
            const existing = await tx.commentLike.findUnique({
                where: { userId_commentId: { userId, commentId } },
                select: { userId: true },
            });

            await tx.commentLike.upsert({
                where: { userId_commentId: { userId, commentId } },
                update: {}, // idempotent
                create: { userId, commentId },
            });

            const likesCount = await tx.commentLike.count({ where: { commentId } });
            return { likesCount, createdNew: !existing };
        });

        return {
            success: true,
            message: createdNew ? 'Comment liked.' : 'Comment already liked.',
            commentId,
            userId,
            likesCount,
        };
    }

    async unlikeComment(commentId: string, userId: string): Promise<UnlikeCommentResponse> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true },
        });
        if (!comment) {
            return { success: false, message: 'Comment not found.', commentId, userId, likesCount: 0 };
        }

        const { removed, likesCount } = await this.prisma.$transaction(async (tx) => {
            const res = await tx.commentLike.deleteMany({ where: { commentId, userId } });
            const likesCount = await tx.commentLike.count({ where: { commentId } });
            return { removed: res.count > 0, likesCount };
        });

        return {
            success: true,
            message: removed ? 'Comment unliked.' : 'Comment was not liked.',
            commentId,
            userId,
            likesCount,
        };
    }

    async likeCommentReply(replyId: string, userId: string): Promise<LikeCommentReplyResponse> {
        const reply = await this.prisma.commentReply.findUnique({
            where: { id: replyId },
            select: { id: true },
        });
        if (!reply) {
            return { success: false, message: 'Reply not found.', replyId, userId, likesCount: 0 };
        }

        const { likesCount, createdNew } = await this.prisma.$transaction(async (tx) => {
            const existing = await tx.commentReplyLike.findUnique({
                where: { userId_replyId: { userId, replyId } },
                select: { userId: true },
            });

            await tx.commentReplyLike.upsert({
                where: { userId_replyId: { userId, replyId } },
                update: {},
                create: { userId, replyId },
            });

            const likesCount = await tx.commentReplyLike.count({ where: { replyId } });
            return { likesCount, createdNew: !existing };
        });

        return {
            success: true,
            message: createdNew ? 'Reply liked.' : 'Reply already liked.',
            replyId,
            userId,
            likesCount,
        };
    }

    async unlikeCommentReply(replyId: string, userId: string): Promise<UnlikeCommentReplyResponse> {
        const reply = await this.prisma.commentReply.findUnique({
            where: { id: replyId },
            select: { id: true },
        });
        if (!reply) {
            return { success: false, message: 'Reply not found.', replyId, userId, likesCount: 0 };
        }

        const { removed, likesCount } = await this.prisma.$transaction(async (tx) => {
            const res = await tx.commentReplyLike.deleteMany({ where: { replyId, userId } });
            const likesCount = await tx.commentReplyLike.count({ where: { replyId } });
            return { removed: res.count > 0, likesCount };
        });

        return {
            success: true,
            message: removed ? 'Reply unliked.' : 'Reply was not liked.',
            replyId,
            userId,
            likesCount,
        };
    }

    async getPostComments(postId: string, page: number = 1, limit: number = 20): Promise<GetPostCommentsResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            return {
                success: false,
                postId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                comments: [],
            };
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [comments, total] = await Promise.all([
            this.prisma.comment.findMany({
                where: { postId },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    authorId: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: { select: { likes: true } }, // relies on CommentLike relation name `likes`
                },
                skip,
                take: normalizedLimit,
            }),
            this.prisma.comment.count({ where: { postId } }),
        ]);

        const dtoList: PostCommentDto[] = comments.map((c) => ({
            id: c.id,
            authorId: c.authorId,
            content: c.content,
            likesCount: c._count.likes,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        }));

        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            postId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            comments: dtoList,
        };
    }

    async getPostLikes(postId: string, page: number = 1, limit: number = 20): Promise<GetPostLikesResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            return {
                success: false,
                postId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                users: [],
            };
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [likes, total] = await Promise.all([
            this.prisma.postLike.findMany({
                where: { postId },
                select: { user: { select: { id: true } } },
                // orderBy: { createdAt: 'desc' }, // uncomment if PostLike has createdAt
                skip,
                take: normalizedLimit,
            }),
            this.prisma.postLike.count({ where: { postId } }),
        ]);

        const users: PublicUserLiteDto[] = likes.map((l) => ({ id: l.user.id }));
        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            postId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            users,
        };
    }

    async getCommentLikes(commentId: string, page: number = 1, limit: number = 20): Promise<GetCommentLikesResponse> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true },
        });
        if (!comment) {
            return {
                success: false,
                commentId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                users: [],
            };
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [likes, total] = await Promise.all([
            this.prisma.commentLike.findMany({
                where: { commentId },
                select: { user: { select: { id: true } } },
                orderBy: { createdAt: 'desc' },
                skip,
                take: normalizedLimit,
            }),
            this.prisma.commentLike.count({ where: { commentId } }),
        ]);

        const users: PublicUserLiteDto[] = likes.map((l) => ({ id: l.user.id }));
        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            commentId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            users,
        };
    }

    async addCommentReply(
        postId: string,
        commentId: string,
        userId: string,
        dto: AddCommentReplyDto,
    ): Promise<AddCommentReplyResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            return { success: false, message: 'Post not found or has been deleted.', postId, commentId, userId };
        }

        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: { id: true, postId: true },
        });
        if (!comment || comment.postId !== postId) {
            return { success: false, message: 'Comment not found.', postId, commentId, userId };
        }

        const { replyId, repliesCount } = await this.prisma.$transaction(async (tx) => {
            const reply = await tx.commentReply.create({
                data: {
                    commentId,
                    authorId: userId,
                    content: dto.content.trim(),
                },
                select: { id: true },
            });

            const repliesCount = await tx.commentReply.count({ where: { commentId } });
            return { replyId: reply.id, repliesCount };
        });

        return {
            success: true,
            message: 'Reply added.',
            postId,
            commentId,
            userId,
            replyId,
            repliesCount,
        };
    }

    async getCommentReplyLikes(
        replyId: string,
        page: number = 1,
        limit: number = 20,
    ): Promise<GetCommentReplyLikesResponse> {
        const reply = await this.prisma.commentReply.findUnique({
            where: { id: replyId },
            select: { id: true },
        });
        if (!reply) {
            return {
                success: false,
                replyId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                users: [],
            };
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [likes, total] = await Promise.all([
            this.prisma.commentReplyLike.findMany({
                where: { replyId },
                select: { user: { select: { id: true } } },
                orderBy: { createdAt: 'desc' },
                skip,
                take: normalizedLimit,
            }),
            this.prisma.commentReplyLike.count({ where: { replyId } }),
        ]);

        const users: PublicUserLiteDto[] = likes.map((l) => ({ id: l.user.id }));
        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            replyId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            users,
        };
    }

    // DONE, self guard jaki albo co
    async removeCommentReply(
        postId: string,
        commentId: string,
        replyId: string,
        userId: string,
    ): Promise<RemoveCommentReplyResponse> {
        const reply = await this.prisma.commentReply.findUnique({
            where: { id: replyId },
            select: {
                id: true,
                authorId: true,
                commentId: true,
                comment: {
                    select: {
                        id: true,
                        authorId: true,
                        post: { select: { id: true, authorId: true, deletedAt: true } },
                    },
                },
            },
        });

        if (!reply || reply.commentId !== commentId || reply.comment.post.id !== postId) {
            return { success: false, message: 'Reply not found.', postId, commentId, replyId, userId };
        }
        if (reply.comment.post.deletedAt) {
            return { success: false, message: 'Post has been deleted.', postId, commentId, replyId, userId };
        }

        // w guardzie SelfGuard czy cos
        // const isReplyAuthor = reply.authorId === userId;
        // const isCommentAuthor = reply.comment.authorId === userId;
        // const isPostAuthor = reply.comment.post.authorId === userId;

        // if (!isReplyAuthor && !isCommentAuthor && !isPostAuthor) {
        //     return { success: false, message: 'Not authorized to remove this reply.', postId, commentId, replyId, userId };
        // }

        const { repliesCount } = await this.prisma.$transaction(async (tx) => {
            await tx.commentReply.delete({ where: { id: replyId } });
            const repliesCount = await tx.commentReply.count({
                where: {
                    commentId,
                },
            });

            return { repliesCount };
        });

        return {
            success: true,
            message: 'Reply removed.',
            postId,
            commentId,
            replyId,
            userId,
            repliesCount,
        };
    }

    async getPostCommentReplies(
        postId: string,
        commentId: string,
        page: number = 1,
        limit: number = 20,
    ): Promise<GetPostCommentRepliesResponse> {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                postId: true,
                post: { select: { id: true, deletedAt: true } },
            },
        });

        if (!comment || comment.postId !== postId || comment.post.deletedAt) {
            return {
                success: false,
                postId,
                commentId,
                total: 0,
                page: 1,
                limit: 20,
                totalPages: 0,
                replies: [],
            };
        }

        // Validate and normalize pagination parameters
        const normalizedPage = Math.max(1, page || 1);
        const normalizedLimit = Math.max(1, Math.min(100, limit || 20)); // Cap at 100 items per page
        const skip = (normalizedPage - 1) * normalizedLimit;

        const [replies, total] = await Promise.all([
            this.prisma.commentReply.findMany({
                where: { commentId },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    commentId: true,
                    authorId: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: { select: { likes: true } }, // relation name is `likes` on CommentReply
                },
                skip,
                take: normalizedLimit,
            }),
            this.prisma.commentReply.count({ where: { commentId } }),
        ]);

        const dtoList: PostCommentReplyDto[] = replies.map((r) => ({
            id: r.id,
            commentId: r.commentId,
            authorId: r.authorId,
            content: r.content,
            likesCount: r._count.likes,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
        }));

        const totalPages = Math.ceil(total / normalizedLimit);

        return {
            success: true,
            postId,
            commentId,
            total,
            page: normalizedPage,
            limit: normalizedLimit,
            totalPages,
            replies: dtoList,
        };
    }
}

/*
    upload images to server using multer and store them in minio
    likes and comments on posts
    pagination of the post list
*/
