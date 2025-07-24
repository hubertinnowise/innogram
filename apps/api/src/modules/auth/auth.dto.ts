export interface RegisterDto {
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface TokenPayload {
    userId: string;
}

export interface RefreshDto {
    refreshToken: string;
}
