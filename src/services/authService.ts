import { User } from "@prisma/client";
import { notFoundError } from "../utils/errorUtil";

export type CreateUser =  Omit<User, "id">

export async function registerUser ( dataUser: CreateUser ) {
    
}