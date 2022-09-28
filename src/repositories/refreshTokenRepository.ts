import prisma from '../config/database';

interface IRefresshToken {
    refreshToken: string;
    userId: number;
}

export async function findByRefreshToken(refreshToken: string) {
  const result = await prisma.refreshToken.findUnique({
    where: {
      refreshToken,
    },
  });
  return result;
}

export async function insertRefreshToken(refreshTokenData: IRefresshToken) {
  const { userId, refreshToken } = refreshTokenData;

  await prisma.refreshToken.create({
    data: { userId, refreshToken },
  });
}

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
