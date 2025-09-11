import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse, UserPostResponse } from "./responses";
import { CommentPostDto, CreatePostDto, EditPostDto, PublicPostDto } from "./dto";
import { DatabaseService } from "@/core/database/database.service";
import { UserFeedResponse } from "./responses/user-feed-response";

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
    //
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

    // lista postow autorstwa userId, paginacja
    async getUserPosts(userId: string): Promise<UserPostResponse> {
        return;
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

    //tutaj tez guard ze tylko autor moze edytowac
    async editPost(postId: string, userId: string, dto: EditPostDto): Promise<EditPostResponse> {
        return;
    }

    async createPost(authordId: string, dto: CreatePostDto): Promise<CreatePostResponse> {
        return;
    }

    // tez guard ze autor moze usuwac, dto moze
    async removePost(postId: string, userId: string): Promise<RemovePostResponse> {
        return;
    }

    // getPostComments
    // getPostLikes, lista userow ktorzy polubili post
}

/*
    upload images to server using multer and store them in minio
    likes and comments on posts
    pagination of the post list
*/