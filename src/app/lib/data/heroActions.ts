// src/lib/data/heroActions.ts

"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchHeroDescription(userId: string, language: string) {
    return await prisma.heroDescription.findFirst({
        where: { userId, language },
        select: { text: true },
    });
}

export async function postHeroDescription(data: { userId: string; language: string; text: string }) {
    return await prisma.heroDescription.upsert({
        where: { userId_language: { userId: data.userId, language: data.language } },
        update: { text: data.text, updatedAt: new Date() },
        create: {
            userId: data.userId,
            language: data.language,
            text: data.text,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}
