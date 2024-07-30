"use server";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function verifyUserExistence(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return !!user;
    } catch (error) {
        console.error('Error in verifyUserExistence:', error);
        return false;
    }
}