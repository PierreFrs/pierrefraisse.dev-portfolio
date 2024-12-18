import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma";
import {del} from "@vercel/blob";

export async function DELETE(
    { params } : { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (!id) {
        return NextResponse.json({ error: "Missing badge ID" }, { status: 400 });
    }

    try {
        // First find the project
        const project = await prisma.projectCard.findUnique({
            where: { id }
        });

        // Delete the picture from the blob storage
        if (project?.pictureUrl) {
            await del(project.pictureUrl).catch(() => {
                console.log("No previous picture found to delete in storage.");
            });
        }

        // Delete the stack badge with the given ID
        await prisma.projectCard.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}