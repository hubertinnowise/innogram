import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsInt, IsOptional, IsString, IsUUID, Length, MaxLength, Min } from 'class-validator';

export class PublicUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(500)
    bio?: string;

    @Type(() => Date)
    @IsDate()
    createdAt!: Date;

    @IsInt()
    @Min(0)
    followersCount!: number;

    @IsInt()
    @Min(0)
    followingCount!: number;

    @IsUUID('4')
    id!: string;

    @IsString()
    @Length(3, 30)
    username!: string;
}
