import { ApiProperty } from '@nestjs/swagger';

export class HardUserDeleteResponse {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User deleted.' })
  message: string;

  @ApiProperty({ example: 'deleted-user-uuid' })
  userId: string;
}
