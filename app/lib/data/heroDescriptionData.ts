"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const FormSchema = z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description cannot be empty."),
    language: z.string().min(1, "Language cannot be empty."),
    userId: z.string().min(1, "User ID cannot be empty."),
});

export async function postHeroDescription(formData: FormData) {
    // Extract data from FormData
    const data = Object.fromEntries(formData.entries());

    // Validate and parse data
    const validatedFields = FormSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Description.",
        };
    }
    
    const { id, description, language, userId } = validatedFields.data;
    
    try {
        const heroDescription = await prisma.heroDescription.upsert({
            where: { id: id ?? '' },
            update: { text: description, language, updatedAt: new Date() },
            create: {
                userId,
                language,
                text: description,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return heroDescription;
    } catch (error) {
        console.error("Error in postHeroDescription:", error);
        return {
            message: "An error occurred while updating the hero description.",
            error: error instanceof z.ZodError ? error.errors : error,
        };
    }
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
