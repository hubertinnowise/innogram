import { ApiProperty } from '@nestjs/swagger';

export class PublicUserLiteDto {
    @ApiProperty({ description: 'User ID.', example: 'usr_1c2b3a4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d' })
    id: string;
}
