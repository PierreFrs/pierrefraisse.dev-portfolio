// src/lib/data/heroPictureActions.ts

"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchHeroPicture() {
    return await prisma.heroPicture.findFirst({
        select: { url: true },
    });
}

export async function postHeroPicture(data: { userId: string; url: string }) {
    return await prisma.heroPicture.create({
        data: {
            userId: data.userId,
            url: data.url,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}
