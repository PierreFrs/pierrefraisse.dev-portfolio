"use server";

import {PrismaClient} from "@prisma/client";
import {z} from "zod";
import {verifyUserExistence} from "@/app/lib/data/userActions";

const prisma = new PrismaClient();

const FormSchema = z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description cannot be empty."),
    language: z.string().min(1, "Language cannot be empty."),
    userId: z.string().min(1, "User ID cannot be empty."),
});

export async function postHeroDescription(userId: string, formData: FormData) {
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
    
    const { description, language } = validatedFields.data;

    if (!await verifyUserExistence(userId)) {
        return {
            redirect: "/login",
            message: "User not found. Redirecting to login page.",
        }
    }

    try {
        // Check if a description already exists for the userId and language
        const existingDescription = await prisma.heroDescription.findFirst({
            where: { userId, language },
        });

        if (existingDescription) {
            // Update the existing description
            return await prisma.heroDescription.update({
                where: { id: existingDescription.id },
                data: {
                    text: description,
                    updatedAt: new Date(),
                },
            });
        } else {
            // Create a new description
            return await prisma.heroDescription.create({
                data: {
                    userId,
                    language,
                    text: description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
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
