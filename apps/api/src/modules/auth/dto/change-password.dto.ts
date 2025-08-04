import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'The new password to set for the user',
    example: 'newStrongPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @ApiProperty({
    description: 'The user\'s current password for verification',
    example: 'oldPassword456',
  })
  @IsString()
  oldPassword!: string;

  @ApiProperty({
    description: 'The UUID of the user whose password is being changed',
    example: 'c7638a2d-bf5e-4f8a-aeb3-631b13a27a97',
  })
  @IsUUID()
  userId!: string;
}
