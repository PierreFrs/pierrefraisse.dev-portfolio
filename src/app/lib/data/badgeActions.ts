// src/lib/data/badgeActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {del, put} from "@vercel/blob";

const prisma = new PrismaClient();

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
            await del(existingBadge.pictureUrl).catch(() => {
                console.log("No previous icon found to delete in storage.");
            });

            await prisma.stackBadge.delete({
                where: { id: existingBadge.id },
            });
        }

        const blob = await put(icon.name, icon, {
            access: "public",
        });

        return await prisma.stackBadge.create({
            data: {
                name,
                pictureUrl: blob.url,
                userId,
            },
        });

    } catch (error) {
        console.error("Error in addBadge action:", error);
        throw new Error("Failed to add badge");
    }
}



export async function removeBadge(id: string) {
    return await prisma.stackBadge.delete({
        where: { id },
    });
}
