import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user as { id?: string } | undefined;
        const id = req.params?.id as string | undefined;

        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (!id) {
            throw new ForbiddenException('Missing target user id');
        }

        if (user.id !== id) {
            throw new ForbiddenException('Only the resource owner can perform this action');
        }

        return true;
    }
}
