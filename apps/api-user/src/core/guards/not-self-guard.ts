import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class NotSelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user as { id?: string } | undefined;
        const id = req.params?.id as string | undefined;

        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (!id) {
            throw new BadRequestException('Targeted user id missing');
        }

        if (id === user.id) {
            throw new BadRequestException('You cannot perform this action on yourself');
        }

        return true;
    }
}
