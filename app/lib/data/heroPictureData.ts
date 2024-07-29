"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function fetchHeroPicture() {
    try {
        const hero = await prisma.heroPicture.findFirst({
            select: { url: true },
        });
        return hero || { url: "/default-image.jpg" };
    } catch (error) {
        return {
            message: "An error occurred while fetching the hero picture.",
            error,
        };
    }
}