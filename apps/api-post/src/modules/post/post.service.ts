import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse, UserPostResponse } from "./responses";
import { CommentPostDto, CreatePostDto, EditPostDto, PostCommentDto, PublicPostDto } from "./dto";
import { DatabaseService } from "@/core/database/database.service";
import { UserFeedResponse } from "./responses/user-feed-response";
import { UnlikeCommentReplyResponse } from "./responses/unlike-comment-reply.response";
import { LikeCommentReplyResponse } from "./responses/like-comment-reply.response";
import { UnlikeCommentResponse } from "./responses/unlike-comment.response";
import { LikeCommentResponse } from "./responses/like-comment.response";
import { PublicPostMediaDto } from "./dto/public-post-media.dto";
import { PostMediaType } from '@prisma/client';
import { GetPostCommentsResponse } from "./responses/get-post-comments.response";
import { RemoveCommentReplyResponse } from "./responses/remove-comment-reply.response";

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(private readonly prisma: DatabaseService) {
        // rabbit client tez
        // database service dla tego microserviceu 
    }

    //DONE
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

        return {
            success: true,
            message: alreadyExisted ? 'Post already liked.' : 'Post liked.',
            postId,
            userId,
            likesCount,
        };
    }

    //DONE
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
    //DONE
    async removePostComment(postId: string, commentId: string, userId: string,): Promise<RemovePostCommentResponse> {
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

    // algorytm co wyswieltic userowi zeby sobie scrollowal
    async getUserFeed(userId: string): Promise<UserFeedResponse> {
        return;
    }

    // DONE, pagination
    async getUserPosts(userId: string): Promise<UserPostResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            return {
                success: false,
                userId,
                total: 0,
                posts: [],
            } as UserPostResponse;
        }

        const posts = await this.prisma.post.findMany({
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
        });

        const dtoList: PublicPostDto[] = posts.map((p) => ({
            id: p.id,
            authorId: p.authorId,
            content: p.content,
            media: p.media.map<PublicPostMediaDto>((m) => ({
                id: m.id,
                // m.type is PostMediaType; cast to the DTO union (identical literal values)
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

        return {
            success: true,
            userId,
            total: dtoList.length,
            posts: dtoList,
        };
    }

    //DONE
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
            media: post.media.map(m => ({
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

    // SelfGuard   
    async editPost(postId: string, userId: string, dto: EditPostDto): Promise<EditPostResponse> {
        return;
    }

    async createPost(authordId: string, dto: CreatePostDto): Promise<CreatePostResponse> {
        return;
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

    // addCommentReply

    async getPostComments(postId: string): Promise<GetPostCommentsResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            return { success: false, postId, total: 0, comments: [] };
        }

        const comments = await this.prisma.comment.findMany({
            where: {
                postId,
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                authorId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                _count: { select: { likes: true } }, // relies on CommentLike relation name `likes`
            },
        });

        const dtoList: PostCommentDto[] = comments.map((c) => ({
            id: c.id,
            authorId: c.authorId,
            content: c.content,
            likesCount: c._count.likes,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
        }));

        return {
            success: true,
            postId,
            total: dtoList.length,
            comments: dtoList,
        };
    }

    // getPostLikes, lista userow ktorzy polubili post
    // getCommentLikes 
    // getCommentReplyLikes

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
}

/*
    upload images to server using multer and store them in minio
    likes and comments on posts
    pagination of the post list
*/