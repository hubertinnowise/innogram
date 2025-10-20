import { ApiProperty } from '@nestjs/swagger';

import { PublicUserDto } from '../dto';

export class ListUsersResponse {
    @ApiProperty({ example: 2 })
    count: number;

    @ApiProperty({ type: () => [PublicUserDto] })
    items: PublicUserDto[];
}
