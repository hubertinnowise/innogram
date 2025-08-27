// admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('You must be logged in');
        }

        if (!user.isAdmin) {
            throw new ForbiddenException('Access denied: Admins only');
        }
        
        return true;
    }
}