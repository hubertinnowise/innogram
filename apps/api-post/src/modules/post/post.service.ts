import { Injectable, Logger } from "@nestjs/common"
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse, UserPostResponse } from "./responses";
import { CommentPostDto, CreatePostDto, EditPostDto } from "./dto";
import { DatabaseService } from "@/core/database/database.service";

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(private readonly prisma: DatabaseService) {
        //rabbit client tez
        // database service dla tego microserviceu 
    }

    async likePost(postId: string, userId: string): Promise<LikePostResponse> {
        return;
    }

    async unlikePost(postId: string, userId: string): Promise<UnlikePostResponse> {
        return;
    }

    async commentPost(postId: string, dto: CommentPostDto) : Promise<CommentPostResponse> {
        return;
    }

    async removePostComment(postId: string, commentId: string): Promise<RemovePostCommentResponse> {
        return;
    }

    // ze jakis getFeed dla usera posty ktore mu wyswietlic, algorytm, infite scroll ideally
    // tutaj sa posty  autorstwa usera userId, czy to nie powinno byc w user service?
    async getUserPosts(userId: string) : Promise<UserPostResponse>{
        return;
    }
    
    async getPost(postId: string) : Promise<GetPostResponse> {
        return;
    }

    async editPost(postId: string, dto: EditPostDto) : Promise<EditPostResponse>{
        return;
    }
    
    async createPost(dto: CreatePostDto) : Promise<CreatePostResponse> {
        return;
    }

    async removePost(postId: string, userId: string) : Promise<RemovePostResponse> {
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