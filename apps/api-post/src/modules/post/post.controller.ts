import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'packages/jwt-auth.guard';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { CommentPostDto, CreatePostDto, EditPostDto } from './dto';
import {
    AddCommentReplyResponse,
    CommentPostResponse,
    CreatePostResponse,
    EditPostResponse,
    GetCommentLikesResponse,
    GetCommentReplyLikesResponse,
    GetPostCommentRepliesResponse,
    GetPostCommentsResponse,
    GetPostLikesResponse,
    GetPostResponse,
    LikeCommentReplyResponse,
    LikeCommentResponse,
    LikePostResponse,
    RemoveCommentReplyResponse,
    RemovePostCommentResponse,
    RemovePostResponse,
    UnlikeCommentReplyResponse,
    UnlikeCommentResponse,
    UnlikePostResponse,
    UserFeedResponse,
    UserPostResponse,
} from './responses';
import { AddCommentReplyDto } from './dto/add-comment-reply.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // ze tutaj guardy trzeba pododawac wszedzi

    @Get('user/:userId')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists posts by a specific user.' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiOkResponse({ description: 'User posts fetched.', type: UserPostResponse })
    @ApiNotFoundResponse({ description: 'User not found.' })
    async getUserPosts(
        @Param('userId') userId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<UserPostResponse> {
        return this.postService.getUserPosts(userId, page, limit);
    }

    @Post(':postId/comments/:commentId/replies/:replyId/like')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Likes a comment reply.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiParam({ name: 'replyId', description: 'Reply ID' })
    @ApiOkResponse({ description: 'Reply liked.', type: LikeCommentReplyResponse })
    @ApiNotFoundResponse({ description: 'Reply not found.' })
    async likeCommentReply(
        @Req() req: any,
        @Param('postId') _postId: string,
        @Param('commentId') _commentId: string,
        @Param('replyId') replyId: string,
    ): Promise<LikeCommentReplyResponse> {
        const userId: string = req.user.id;
        return this.postService.likeCommentReply(replyId, userId);
    }

    @Post(':postId/comments/:commentId/replies/:replyId/unlike')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Unlikes a comment reply.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiParam({ name: 'replyId', description: 'Reply ID' })
    @ApiOkResponse({ description: 'Reply unliked.', type: UnlikeCommentReplyResponse })
    @ApiNotFoundResponse({ description: 'Reply not found.' })
    async unlikeCommentReply(
        @Req() req: any,
        @Param('postId') _postId: string,
        @Param('commentId') _commentId: string,
        @Param('replyId') replyId: string,
    ): Promise<UnlikeCommentReplyResponse> {
        const userId: string = req.user.id;
        return this.postService.unlikeCommentReply(replyId, userId);
    }

    @Post(':postId/comments/:commentId/like')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Likes a comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Comment ID' })
    @ApiOkResponse({ description: 'Comment liked.', type: LikeCommentResponse })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    async likeComment(
        @Req() req: any,
        @Param('postId') _postId: string,
        @Param('commentId') commentId: string,
    ): Promise<LikeCommentResponse> {
        const userId: string = req.user.id;
        return this.postService.likeComment(commentId, userId);
    }

    @Post(':postId/comments/:commentId/unlike')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Unlikes a comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Comment ID' })
    @ApiOkResponse({ description: 'Comment unliked.', type: UnlikeCommentResponse })
    @ApiNotFoundResponse({ description: 'Comment not found.' })
    async unlikeComment(
        @Req() req: any,
        @Param('postId') _postId: string,
        @Param('commentId') commentId: string,
    ): Promise<UnlikeCommentResponse> {
        const userId: string = req.user.id;
        return this.postService.unlikeComment(commentId, userId);
    }

    @Get(':postId/likes')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists users who liked the post.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiOkResponse({ description: 'Likes fetched.', type: GetPostLikesResponse })
    @ApiNotFoundResponse({ description: 'Post not found or deleted.' })
    async getPostLikes(
        @Param('postId') postId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<GetPostLikesResponse> {
        return this.postService.getPostLikes(postId, page, limit);
    }

    @Get(':postId/comments')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists comments for the post.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiOkResponse({ description: 'Comments fetched.', type: GetPostCommentsResponse })
    @ApiNotFoundResponse({ description: 'Post not found or deleted.' })
    async getPostComments(
        @Param('postId') postId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<GetPostCommentsResponse> {
        return this.postService.getPostComments(postId, page, limit);
    }

    @Get(':postId/comments/:commentId/replies/:replyId/likes')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists users who liked the reply.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiParam({ name: 'replyId', description: 'Reply ID' })
    @ApiOkResponse({ description: 'Likes fetched.', type: GetCommentReplyLikesResponse })
    @ApiNotFoundResponse({ description: 'Reply or parent not found.' })
    async getCommentReplyLikes(
        @Param('postId') _postId: string,
        @Param('commentId') _commentId: string,
        @Param('replyId') replyId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<GetCommentReplyLikesResponse> {
        // Service checks existence and returns friendly response
        return this.postService.getCommentReplyLikes(replyId, page, limit);
    }

    @Post(':postId/comments/:commentId/replies')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Adds a reply to a comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiCreatedResponse({ description: 'Reply created.', type: AddCommentReplyResponse })
    @ApiNotFoundResponse({ description: 'Post or comment not found.' })
    async addCommentReply(
        @Req() req: any,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Body() dto: AddCommentReplyDto,
    ): Promise<AddCommentReplyResponse> {
        const userId: string = req.user.id;
        return this.postService.addCommentReply(postId, commentId, userId, dto);
    }

    @Get(':postId/comments/:commentId/likes')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists users who liked the comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Comment ID' })
    @ApiOkResponse({ description: 'Likes fetched.', type: GetCommentLikesResponse })
    @ApiNotFoundResponse({ description: 'Post or comment not found.' })
    async getCommentLikes(
        @Param('postId') _postId: string,
        @Param('commentId') commentId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<GetCommentLikesResponse> {
        // Service checks existence and returns friendly response
        return this.postService.getCommentLikes(commentId, page, limit);
    }

    @Delete(':postId/comments/:commentId/replies/:replyId')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Removes a reply from a comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiParam({ name: 'replyId', description: 'Reply ID' })
    @ApiOkResponse({ description: 'Reply removed.', type: RemoveCommentReplyResponse })
    @ApiForbiddenResponse({ description: 'Not authorized to remove this reply.' })
    @ApiNotFoundResponse({ description: 'Reply or parent not found.' })
    async removeCommentReply(
        @Req() req: any,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Param('replyId') replyId: string,
    ): Promise<RemoveCommentReplyResponse> {
        const userId: string = req.user.id;
        return this.postService.removeCommentReply(postId, commentId, replyId, userId);
    }

    @Get(':postId/comments/:commentId/replies')
    @HttpCode(200)
    @ApiOperation({ summary: 'Lists replies for a comment.' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Parent comment ID' })
    @ApiOkResponse({ description: 'Replies fetched.', type: GetPostCommentRepliesResponse })
    @ApiNotFoundResponse({ description: 'Post or comment not found.' })
    async getPostCommentReplies(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<GetPostCommentRepliesResponse> {
        return this.postService.getPostCommentReplies(postId, commentId, page, limit);
    }

    @Post(':id/like')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Likes the post with :id.' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Liked', type: LikePostResponse })
    @ApiNotFoundResponse({ description: 'Post not found' })
    async likePost(@Req() req: any, @Param('id') id: string): Promise<LikePostResponse> {
        const userId: string = req.user.id;
        return this.postService.likePost(id, userId);
    }

    @Post(':id/unlike')
    @UseGuards(JwtAuthGuard)
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

    @Get('feed')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Get personalized user feed based on likes and follows' })
    @ApiOkResponse({ description: 'Feed fetched successfully.', type: UserFeedResponse })
    async getUserFeed(@Req() req: any): Promise<UserFeedResponse> {
        const userId: string = req.user.id;
        return this.postService.getUserFeed(userId);
    }

    @Post(':postId/comments')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Add a comment to a post' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiCreatedResponse({ description: 'Comment created', type: CommentPostResponse })
    async commentPost(
        @Req() req: any,
        @Param('postId') postId: string,
        @Body() dto: CommentPostDto,
    ): Promise<CommentPostResponse> {
        const userId: string = req.user.id;
        return this.postService.commentPost(postId, userId, dto);
    }

    @Delete(':postId/comments/:commentId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Remove a comment from a post' })
    @ApiParam({ name: 'postId', description: 'Post ID' })
    @ApiParam({ name: 'commentId', description: 'Comment ID' })
    @ApiOkResponse({ description: 'Comment removed', type: RemovePostCommentResponse })
    async removePostComment(
        @Req() req: any,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
    ): Promise<RemovePostCommentResponse> {
        const userId: string = req.user.id;
        return this.postService.removePostComment(postId, commentId, userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create post' })
    @ApiCreatedResponse({ description: 'Created', type: CreatePostResponse })
    async createPost(@Req() req: any, @Body() dto: CreatePostDto): Promise<CreatePostResponse> {
        const authorId: string = req.user.id;
        return this.postService.createPost(authorId, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Remove post' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Removed', type: RemovePostResponse })
    async removePost(@Req() req: any, @Param('id') postId: string): Promise<RemovePostResponse> {
        const userId: string = req.user.id;
        return this.postService.removePost(postId, userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Partially update a post' })
    @ApiParam({ name: 'id', description: 'Post ID' })
    @ApiOkResponse({ description: 'Updated', type: EditPostResponse })
    async editPost(@Req() req: any, @Param('id') postId: string, @Body() dto: EditPostDto): Promise<EditPostResponse> {
        const authorId: string = req.user.id;
        return this.postService.editPost(postId, authorId, dto);
    }
}
