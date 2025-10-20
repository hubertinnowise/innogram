import { ApiProperty } from '@nestjs/swagger';

export class IsUserBannedResponse {
    @ApiProperty({ example: false })
    isBanned: boolean;
}
