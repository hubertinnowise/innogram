import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse, UserPostResponse } from "./responses";
import { CommentPostDto, CreatePostDto, EditPostDto, PublicPostDto } from "./dto";
import { DatabaseService } from "@/core/database/database.service";

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

    async commentPost(postId: string, dto: CommentPostDto): Promise<CommentPostResponse> {
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

        const content = dto.content.trim();
        if (!content) {
            throw new Error('Content must not be empty.');
        }

        const { commentId, commentsCount } = await this.prisma.$transaction(async (tx) => {
            const comment = await tx.comment.create({
                data: {
                    postId,
                    authorId: dto.userId,
                    content,
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
            userId: dto.userId,
            commentId,
            commentsCount,
        };
    }

    // guard ze tylko autor komentarza moze go usuwac
    async removePostComment(postId: string, commentId: string, authorId: string): Promise<RemovePostCommentResponse> {
        return;
    }

    // ze jakis getFeed dla usera posty ktore mu wyswietlic, algorytm, infite scroll ideally
    // tutaj sa posty  autorstwa usera userId, czy to nie powinno byc w user service?
    async getUserPosts(userId: string): Promise<UserPostResponse> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const posts = await this.prisma.post.findMany({
            where: { authorId: userId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            include: {
                media: {
                    orderBy: { position: 'asc' },
                    select: {
                        id: true,
                        type: true,
                        url: true,
                        bucket: true,
                        objectKey: true,
                        position: true,
                        width: true,
                        height: true,
                        durationMs: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });

        return;

        // return {
        //     success: true,
        //     userId,
        //     total: posts.length,
        //     posts: posts.map((p) => ({
        //         postId: p.id,
        //         authorId: p.authorId,
        //         content: p.content,
        //         createdAt: p.createdAt,
        //         updatedAt: p.updatedAt ?? undefined,
        //         media: p.media.map((m) => ({
        //             id: m.id,
        //             type: m.type as any, // align enum to union type
        //             url: m.url ?? undefined,
        //             bucket: m.bucket ?? undefined,
        //             objectKey: m.objectKey ?? undefined,
        //             position: m.position,
        //             width: m.width ?? undefined,
        //             height: m.height ?? undefined,
        //             durationMs: m.durationMs ?? undefined,
        //         })),
        //         likesCount: p._count.likes,
        //         commentsCount: p._count.comments,
        //     })),
        // };
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

    // getPostComments, czy to jest included jakby w Gecie? 
    // getPostLikes mogloby zwracac userow ktorzy polubili post, uzyteczne
}

/*
    posts with images and text

    upload images to server using multer and store them in minio
    likes and comments on posts
    pagination of the post list
*/