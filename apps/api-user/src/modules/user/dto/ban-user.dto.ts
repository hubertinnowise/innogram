import { IsOptional, IsString, IsDateString } from 'class-validator';

export class BanUserDto {
  @IsOptional()
  @IsDateString()
  bannedUntil?: string; // ISO date string, null/undefined => permanent ban

  @IsOptional()
  @IsString()
  banReason?: string;
}