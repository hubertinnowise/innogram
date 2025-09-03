import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../dto';

export class ListUsersResponse {
  @ApiProperty({ type: () => [PublicUserDto] })
  items: PublicUserDto[];

  @ApiProperty({ example: 2 })
  count: number;
}