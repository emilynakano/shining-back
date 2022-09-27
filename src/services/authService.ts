import { User } from "@prisma/client";
import * as authRepository from "../repositories/authRepository";
import * as errorUtils from "../utils/errorUtil"

export type CreateUser =  Omit<User, "id">

export async function registerUser ( dataUser: CreateUser ) {

    await authRepository.registerUser(dataUser)
}