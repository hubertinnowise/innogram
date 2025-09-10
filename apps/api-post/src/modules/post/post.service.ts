import { Injectable, Logger } from "@nestjs/common"
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse, UserPostResponse } from "./responses";
import { CommentPostDto, CreatePostDto, EditPostDto } from "./dto";
import { DatabaseService } from "@/core/database/database.service";

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(private readonly prisma: DatabaseService) {
        // rabbit client tez
        // database service dla tego microserviceu 
    }

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

    async unlikePost(postId: string, userId: string): Promise<UnlikePostResponse> {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { id: true, deletedAt: true },
        });
        if (!post || post.deletedAt) {
            throw new Error('Post not found or has been deleted.');
        }

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

    async removePostComment(postId: string, commentId: string): Promise<RemovePostCommentResponse> {
        return;
    }

    // ze jakis getFeed dla usera posty ktore mu wyswietlic, algorytm, infite scroll ideally
    // tutaj sa posty  autorstwa usera userId, czy to nie powinno byc w user service?
    async getUserPosts(userId: string): Promise<UserPostResponse> {
        return;
    }

    async getPost(postId: string): Promise<GetPostResponse> {
        return;
    }

    async editPost(postId: string, dto: EditPostDto): Promise<EditPostResponse> {
        return;
    }

    async createPost(dto: CreatePostDto): Promise<CreatePostResponse> {
        return;
    }

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