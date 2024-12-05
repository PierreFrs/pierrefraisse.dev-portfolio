import {NextResponse} from "next/server";
import {del, put} from "@vercel/blob";
import {prisma} from "../../../../prisma/prisma";

const profilePictureName = "profile_picture.jpg"
export async function POST(req: Request) {
    
    const form = await req.formData();
    const file = form.get("file") as File;
    const userId = form.get("userId") as string;

    if (!file || !userId) {
        return NextResponse.json({error: "File or userId not provided"}, {status: 400});
    }

    try {
        // Fetch the previous record from the database
        const previousPicture = await prisma.heroPicture.findFirst({
            where: { userId }
        });

        // If the record exists, delete it both from the blob storage and the database
        if (previousPicture) {
            const existingBlobUrl = previousPicture.url;
            await del(existingBlobUrl).catch(() => {
                console.log("No previous picture found to delete in storage.");
            });
            await prisma.heroPicture.delete({
                where: { id: previousPicture.id }
            });
        }

        // Upload the new image to the blob storage
        const blob = await put(profilePictureName, file, {
            access: "public",
        });

        // Store the new image URL and userId in the database
        const newHeroPicture = await prisma.heroPicture.create({
            data: {
                url: blob.url,
                userId,
            },
        });

        return NextResponse.json(newHeroPicture);

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Query the database for a record containing "profile_picture" in the URL
        const heroPicture = await prisma.heroPicture.findFirst({
            where: {
                url: {
                    contains: "profile_picture", // Filters records where the URL contains "profile_picture"
                },
            },
        });

        // If no record is found, return a 404 error
        if (!heroPicture) {
            return NextResponse.json({ error: "No profile picture found" }, { status: 404 });
        }

        // Return the found URL
        return NextResponse.json({ url: heroPicture.url });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while retrieving the picture" }, { status: 500 });
    }
}
