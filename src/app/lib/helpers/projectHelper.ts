// src/lib/helpers/projectHelpers.ts

import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function createProjectFromFormData(formData: FormData) {

    const titleEn = formData.get("titleEn") as string;
    const shortDescriptionEn = formData.get("shortDescriptionEn") as string;
    const titleFr = formData.get("titleFr") as string;
    const shortDescriptionFr = formData.get("shortDescriptionFr") as string;

    const link = formData.get("link") as string;
    const userId = formData.get("userId") as string;
    const stack = formData.getAll("stack") as string[];
    const picture = formData.get("picture") as File;

    if (!titleEn || !titleFr || !shortDescriptionEn || !shortDescriptionFr || !userId || !stack.length || !picture) {
        throw new Error("Missing required fields");
    }

    const blob = await put(picture.name, picture, { access: "public" });

    return await prisma.projectCard.create({
        data: {
            pictureUrl: blob.url,
            stack,
            link,
            userId,
            createdAt: new Date(),
            translations: {
                create: [
                    { language: "en", title: titleEn, shortDescription: shortDescriptionEn },
                    { language: "fr", title: titleFr, shortDescription: shortDescriptionFr }
                ]
            }
        },
        include: { translations: true }
    });
}
