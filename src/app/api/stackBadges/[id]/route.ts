import { NextResponse } from "next/server";
import {prisma} from "../../../../../prisma/prisma";
import {del} from "@vercel/blob";

export async function GET(
    request: Request,
    { params } : { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (!id) {
        return NextResponse.json({ error: "Missing badge ID" }, { status: 400 });
    }

    try {
        // Query the database for the stack badge with the given ID
        const stackBadge = await prisma.stackBadge.findUnique({
            where: { id }
        });

        if (!stackBadge) {
            return NextResponse.json({ error: "Badge not found" }, { status: 404 });
        }

        // Return the fetched stack badge
        return NextResponse.json(stackBadge);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

export async function DELETE(
    request: Request,
    { params } : { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (!id) {
        return NextResponse.json({ error: "Missing badge ID" }, { status: 400 });
    }

    try {
        // First find the badge
        const stackBadge = await prisma.stackBadge.findUnique({
            where: { id }
        });

        // Delete the picture from the blob storage
        if (stackBadge?.pictureUrl) {
            await del(stackBadge.pictureUrl).catch(() => {
                console.log("No previous picture found to delete in storage.");
            });
        }

        // Delete the stack badge with the given ID
        await prisma.stackBadge.delete({
            where: { id }
        });

        // Return a success message
        return NextResponse.json({ message: "Stack badge deleted" });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}