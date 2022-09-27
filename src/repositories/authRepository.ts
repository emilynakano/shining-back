import { CreateUser } from "../services/authService"

import prisma from "../config/database"

export async function registerUser ( dataUser: CreateUser ) {
    await prisma.user.create({
        data: dataUser
    })
};
