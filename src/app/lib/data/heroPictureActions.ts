// src/lib/data/heroPictureActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import {del, put} from "@vercel/blob";

const prisma = new PrismaClient();

export async function fetchHeroPicture() {
    return await prisma.heroPicture.findFirst({
        select: { url: true },
    });
}

export async function postHeroPicture(formData: FormData) {
    try {
        const userId = formData.get("userId") as string;
        const file = formData.get("file") as File;

        if (!userId || !file) {
            console.error("Missing required fields");
            return null;
        }

        const existingPicture = await prisma.heroPicture.findFirst({
            where: { userId },
        });

        if (existingPicture) {
            await del(existingPicture.url).catch(() => {
                console.log("No previous picture found to delete in storage.");
            });

            await prisma.heroPicture.delete({
                where: { id: existingPicture.id },
            });
        }

        const blob = await put(file.name, file, {
            access: "public",
        });

        return await prisma.heroPicture.create({
            data: {
                userId,
                url: blob.url,
                createdAt: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Error in postHeroPicture action:", error);
        throw new Error("Failed to post hero picture");
    }
}
