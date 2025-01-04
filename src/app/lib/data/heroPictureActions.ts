// src/lib/data/heroPictureActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";
import {saveFileToDisk} from "@/app/lib/helpers/fileStorage";

const prisma = new PrismaClient();
const blobStoragePath = process.env.BLOB_STORAGE_PATH ?? "";

export async function fetchHeroPicture() {
    const picture = await prisma.heroPicture.findFirst({
        select: { url: true },
    });

    console.log("DEBUG: Stored picture URL:", picture?.url);

    if (!picture) {
        return { url: null, messageKey: "hero-no-picture" };
    }

    return { url: picture.url, messageKey: null };
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
            const filePath = path.join(blobStoragePath, existingPicture.url);
            await fs.unlink(filePath).catch(() => {
                console.log("No previous picture found to delete.");
            });

            await prisma.heroPicture.delete({
                where: { id: existingPicture.id },
            });
        }

        const fileName = `${userId}-${Date.now()}-${file.name}`;
        const filePath = await saveFileToDisk(file, fileName);

        return await prisma.heroPicture.create({
            data: {
                userId,
                url: path.relative(blobStoragePath, filePath),
                createdAt: new Date(),
            },
        });
    }
    catch (error) {
        console.error("Error in postHeroPicture action:", error);
        throw new Error("Failed to post hero picture");
    }
}
