import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEmail, IsPhoneNumber, IsString, IsDate } from 'class-validator';

export class UserDetailsDto {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    id!: string;

    @ApiProperty({
        description: 'Unique email address of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'Unique username for the user',
        example: 'john_doe',
    })
    @IsString()
    username!: string;

    @ApiProperty({
        description: 'Phone number in international format',
        example: '+48123456789',
    })
    @IsPhoneNumber()
    phoneNumber!: string;

    @ApiProperty({
        description: 'Date when the account was created',
        example: '2025-08-14T10:15:30.000Z',
    })
    @IsDate()
    createdAt!: Date;
}