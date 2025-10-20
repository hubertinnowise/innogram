import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
    constructor(private readonly prisma: DatabaseService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user as { id?: string } | undefined;
        const postId = req.params?.postId || req.params?.id;

        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (!postId) {
            throw new ForbiddenException('Post ID is required');
        }

        // to chyba nie jest konieczne tutaj

        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true, deletedAt: true },
        });

        if (!post || post.deletedAt) {
            throw new ForbiddenException('Post not found or deleted');
        }

        if (post.authorId !== user.id) {
            throw new ForbiddenException('Not authorized to perform this action on this post');
        }

        return true;
    }
}
