import { User } from "@prisma/client";

export type CreateUser =  Omit<User, "id">

export async function registerUser ( dataUser: CreateUser ) {
    
}