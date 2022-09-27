import prisma from "../config/database";

export async function findByRefreshToken ( refreshToken: string ) {
    return await prisma.refreshToken.findUnique({
        where: {
            refreshToken
        }
    })
};

export async function insertRefreshToken(refreshTokenData: { refreshToken: string, userId: number }) {
    const { userId, refreshToken } = refreshTokenData;

    await prisma.refreshToken.create({
        data: { userId, refreshToken },
    });
};

export async function updateRefreshToken(id: number, refreshToken: string) {
    await prisma.refreshToken.update({
        where: { id },
        data: { refreshToken },
    });
}


export async function deleteRefreshTokenById(id: number) {
    await prisma.refreshToken.delete({
        where: { id },
    });
}

export async function deleteRefreshTokenByUserId(userId: number) {
    await prisma.refreshToken.deleteMany({
        where: { userId },
    });
}