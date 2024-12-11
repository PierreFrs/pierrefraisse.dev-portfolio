"use server";

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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

export async function fetchHeroDescription(language: string) {
    try {
        const hero = await prisma.heroDescription.findFirst({
            where: { language },
            select: { text: true },
        });
        if (hero) {
            return { description: hero.text }; // Adjust to return `description`
        }
        return { description: "No description available." };
    } catch (error) {
        return {
            message: "An error occurred while fetching the hero description.",
            error,
        };
    }
}
