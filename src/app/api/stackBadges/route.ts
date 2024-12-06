import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import {del, put} from "@vercel/blob";

export async function POST(req: Request) {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const file = formData.get("icon") as File;
        const userId = formData.get("userId") as string;
        
        if (!name || !file || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        try {
            // Fetch the previous record from the database
            const previousIcon = await prisma.stackBadge.findFirst({
                where: { name }
            });

            // If the record exists, delete it both from the blob storage and the database
            if (previousIcon) {
                const existingBlobUrl = previousIcon.pictureUrl;
                await del(existingBlobUrl).catch(() => {
                    console.log("No previous icon found to delete in storage.");
                });
                await prisma.stackBadge.delete({
                    where: { id: previousIcon.id }
                });
            }
            
        // Upload the file to blob storage
        const blob = await put(file.name, file, {
            access: "public",
        });

        // Create a new badge in the database
        const newBadge = await prisma.stackBadge.create({
            data: {
                name,
                pictureUrl: blob.url,
                userId,
            },
        });

        // Return the newly created badge
        return NextResponse.json(newBadge);
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

export async function GET() {
    try {
        // Query the database for all stack badges
        const stackBadges = await prisma.stackBadge.findMany();

        // Return the fetched stack badges
        return NextResponse.json(stackBadges);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500});
        } else {
            return NextResponse.json({error: "An unknown error occurred"}, {status: 500});
        }
    }
}
