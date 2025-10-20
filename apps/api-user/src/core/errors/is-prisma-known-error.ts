import type { Prisma } from '@prisma/client';

export function isPrismaKnownError(e: unknown): e is Prisma.PrismaClientKnownRequestError {
    return !!e && typeof e === 'object' && 'code' in e;
}
