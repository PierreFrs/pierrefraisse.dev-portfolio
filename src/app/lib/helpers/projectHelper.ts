// src/lib/helpers/projectHelpers.ts

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function createProjectFromFormData(formData: FormData) {

    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const link = formData.get("link") as string;
    const userId = formData.get("userId") as string;
    const stack = formData.getAll("stack") as string[];
    const picture = formData.get("picture") as File;

    if (!title || !shortDescription || !userId || !stack.length || !picture) {
        throw new Error("Missing required fields");
    }

    const blob = await put(picture.name, picture, { access: "public" });

    return await prisma.projectCard.create({
        data: {
            title,
            shortDescription,
            pictureUrl: blob.url,
            stack,
            link,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}
