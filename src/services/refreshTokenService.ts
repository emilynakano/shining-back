import jwt from 'jsonwebtoken';

import * as refreshTokenRepository from '../repositories/refreshTokenRepository';
import { unauthorizedError } from '../utils/errorUtil';

export async function createRefreshToken(userId: number, refreshToken: string) {
    await refreshTokenRepository.insertRefreshToken({ userId, refreshToken });
}

export async function refreshSession(oldRefreshToken: string) {
    const currentRefreshToken = await refreshTokenRepository.findByRefreshToken(oldRefreshToken);
    
    if (!currentRefreshToken) {
        try {
            const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);
            await refreshTokenRepository.deleteRefreshTokenByUserId((decoded as { id: number}).id);
        } catch {
            throw unauthorizedError("refreshToken")
        }

        throw unauthorizedError("refreshToken")
    }


    try {
        const payload = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        if (currentRefreshToken.userId !== (payload as { id: number}).id) {
            throw unauthorizedError("refreshToken")
        }

        const accessToken = jwt.sign({ id: (payload as { id: number}).id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30min' });
        const refreshToken = jwt.sign({ id: (payload as { id: number}).id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });

        await refreshTokenRepository.updateRefreshToken(currentRefreshToken.id, refreshToken);

        return { accessToken, refreshToken };
    } catch (err) {
        await refreshTokenRepository.deleteRefreshTokenById(currentRefreshToken.id);
        throw unauthorizedError("refreshToken")
    }
}