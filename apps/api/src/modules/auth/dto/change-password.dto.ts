import { IsString, IsUUID, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsString()
  oldPassword!: string;

  @IsUUID()
  userId!: string;
}
