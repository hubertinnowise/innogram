import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        description: 'Unique email address of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'Password with minimum 6 characters',
        example: 'StrongPass123!',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password!: string;

    @ApiProperty({
        description: 'Phone number in international format',
        example: '+48123456789',
    })
    @IsPhoneNumber()
    phoneNumber!: string;

    @ApiProperty({
        description: 'Unique username for the user',
        example: 'john_doe',
    })
    @IsString()
    username!: string;
}
