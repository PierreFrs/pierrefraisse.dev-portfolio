// src/lib/data/badgeActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import path from "path";
import fs from "fs/promises";
import {saveFileToDisk} from "@/app/lib/helpers/fileStorage";

const prisma = new PrismaClient();
const blobStoragePath = process.env.BLOB_STORAGE_PATH ?? "";

export async function fetchBadgeById(id: string): Promise<StackBadge | null> {
    return await prisma.stackBadge.findUnique({
        where: { id },
    });
}

export async function fetchBadges() {
    return await prisma.stackBadge.findMany();
}

export async function addBadge(formData: FormData): Promise<StackBadge | null> {
    try {
        const name = formData.get("name") as string;
        const icon = formData.get("icon") as File;
        const userId = formData.get("userId") as string;

        if (!name || !icon || !userId) {
            console.error("Missing required fields");
            return null;
        }

        const existingBadge = await prisma.stackBadge.findFirst({
            where: { name },
        });

        if (existingBadge) {
            const filePath = path.join(blobStoragePath, existingBadge.pictureUrl);
            await fs.unlink(filePath).catch(() => {
                console.log("No previous icon found to delete.");
            });

            await prisma.stackBadge.delete({
                where: { id: existingBadge.id },
            });
        }

        const fileName = `${name}-${Date.now()}-${icon.name}`;
        const filePath = await saveFileToDisk(icon, fileName);

        return await prisma.stackBadge.create({
            data: {
                name,
                pictureUrl: path.relative(blobStoragePath, filePath),
                userId,
            },
        });

    } catch (error) {
        console.error("Error in addBadge action:", error);
        throw new Error("Failed to add badge");
    }
}

export async function removeBadge(id: string) {
    const badge = await prisma.stackBadge.findUnique({ where: { id } });
    if (badge?.pictureUrl) {
        const filePath = path.join(blobStoragePath, badge.pictureUrl);
        await fs.unlink(filePath).catch(() => {
            console.log("No file found to delete.");
        });
    }

    return await prisma.stackBadge.delete({
        where: { id },
    });
}

