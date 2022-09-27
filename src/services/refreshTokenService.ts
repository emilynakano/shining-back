import jwt from 'jsonwebtoken';

import * as refreshTokenRepository from '../repositories/refreshTokenRepository';
import { unauthorizedError } from '../utils/errorUtil';

export async function createRefreshToken(userId: number, refreshToken: string) {
    await refreshTokenRepository.insertRefreshToken({ userId, refreshToken });
}

