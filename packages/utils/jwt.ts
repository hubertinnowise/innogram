import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export function generateTokens(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
