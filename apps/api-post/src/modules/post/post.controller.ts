import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PostService } from "./post.service";
import { CommentPostDto, CreatePostDto, EditPostDto } from "./dto";
import { CommentPostResponse, CreatePostResponse, EditPostResponse, GetPostResponse, LikePostResponse, RemovePostCommentResponse, RemovePostResponse, UnlikePostResponse } from "./responses";

@ApiTags('Posts')
@Controller('posts')
export class PostController {
    posts: any;
    constructor(private readonly postService: PostService) { }

    // ze tutaj guardy trzeba pododawac wszedzi

    @Post(':id/like')
    @HttpCode(200)
    @ApiOperation({ summary: 'Likes the post with :id.' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Liked', type: LikePostResponse })
    @ApiNotFoundResponse({ description: 'Post not found' })
    async likePost(@Req() req: any, @Param('id') id: string): Promise<LikePostResponse> {
        const userId: string = req.user.id;        
        return this.postService.likePost(id, req.user.id);
    }

    @Post(':id/unlike')
    @HttpCode(200)
    @ApiOperation({ summary: 'Unlikes the post with :id.' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Unliked', type: UnlikePostResponse })
    async unlikePost(@Req() req: any, @Param('id') postId: string): Promise<UnlikePostResponse> {
        const userId: string = req.user.id;
        return this.postService.unlikePost(postId, userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a post by ID' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Post', type: GetPostResponse })
    @ApiNotFoundResponse({ description: 'Post not found' })
    async getPost(@Param('id') postId: string): Promise<GetPostResponse> {
        return this.postService.getPost(postId);
    }

    // getUserPosts albo getFeed cos takiego

    @Post(':postId/comments')
    @ApiOperation({ summary: 'Add a comment to a post' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiCreatedResponse({ description: 'Comment created', type: CommentPostResponse })
    async commentPost(
        @Param('postId') postId: string,
        @Body() dto: CommentPostDto,
    ): Promise<CommentPostResponse> {
        return this.postService.commentPost(postId, dto);
    }

    @Delete(':postId/comments/:commentId')
    @ApiOperation({ summary: 'Remove a comment from a post' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Comment ID' })
    @ApiOkResponse({ description: 'Comment removed', type: RemovePostCommentResponse })
    async removePostComment(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
    ): Promise<RemovePostCommentResponse> {
        // user guard jakis 
        return this.posts.removePostComment(postId, commentId);
    }

    @Post()
    @ApiOperation({ summary: 'Create post' })
    @ApiCreatedResponse({ description: 'Created', type: CreatePostResponse })
    async createPost(
        @Body() dto: CreatePostDto,
        @Req() req: any,
    ): Promise<CreatePostResponse> {
        return this.posts.createPost(dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove post' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Removed', type: RemovePostResponse })
    async removePost(
        @Param('id') postId: string,
        @Req() req: any,
    ): Promise<RemovePostResponse> {
        const userId: string = req.user.id;
        return this.posts.removePost(postId, userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update a post' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Updated', type: EditPostResponse })
    async editPost(
        @Param('id') postId: string,
        @Body() dto: EditPostDto,
        @Req() req: any,
    ): Promise<EditPostResponse> {
        const authorId: string = req.user.id;
        return this.posts.editPost(postId, authorId, dto);
    }
}
