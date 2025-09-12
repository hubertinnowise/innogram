import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../dto';

export class PaginatedUsersResponse {
  @ApiProperty({ type: () => [PublicUserDto] })
  users: PublicUserDto[];

  @ApiProperty({ example: 100 })
  total: number;
}
