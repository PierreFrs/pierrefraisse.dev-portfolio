"use server";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function verifyUserExistence(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return !!user;
    } catch (error) {
        console.error('Error in verifyUserExistence:', error);
        return false;
    }
}

export async function getUser(email: string, pwHash: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user?.password === pwHash) {
            // Remove password from the returned user object for security
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        
        return null;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user");
    }
}
