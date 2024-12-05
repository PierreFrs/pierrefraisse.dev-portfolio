import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import {put} from "@vercel/blob";

export async function GET() {
    try {
        // Fetch projects from the database
        const projects = await prisma.projectCard.findMany({
            select: {
                id: true,
                title: true,
                shortDescription: true,
                pictureUrl: true,
                stack: true,  // Ensure that this is correctly structured as an array of StackBadge objects
                link: true,
            },
        });

        // If everything is correct, return the fetched projects
        return NextResponse.json(projects);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    try {
        // Parse the incoming form data
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const shortDescription = formData.get("shortDescription") as string;
        const link = formData.get("link") as string;
        const userId = formData.get("userId") as string;
        const stack = formData.getAll("stack") as string[];
        const file = formData.get("picture") as File; // Assuming the image is in formData under "file"

        // Validate that all required fields are present
        if (!title || !shortDescription || !file || !stack.length || !link || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload the image to blob storage
        const blob = await put(file.name, file, {
            access: "public", // Make the image publicly accessible
        });

        // Create a new project card in the database
        const newProject = await prisma.projectCard.create({
            data: {
                title,
                shortDescription,
                pictureUrl: blob.url, // Save the blob URL in the database
                stack, // Array of stack badges
                link,
                userId,
            },
        });

        // Return the newly created project card
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

