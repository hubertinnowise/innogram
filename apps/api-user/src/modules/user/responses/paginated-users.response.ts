import { ApiProperty } from '@nestjs/swagger';

import { PublicUserDto } from '../dto';

export class PaginatedUsersResponse {
    @ApiProperty({ example: 100 })
    total: number;

    @ApiProperty({ type: () => [PublicUserDto] })
    users: PublicUserDto[];
}
