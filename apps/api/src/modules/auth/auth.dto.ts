import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsString()
  username!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class RefreshDto {
  @IsString()
  refreshToken!: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsString()
  token!: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsString()
  oldPassword!: string;

  @IsUUID()
  userId!: string;
}

export class VerifyEmailDto {
  @IsString()
  token!: string;
}
