import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import {createProjectFromFormData} from "@/app/lib/helpers/projectHelper";

export async function GET() {
    try {

        const projects = await prisma.projectCard.findMany({
            select: {
                id: true,
                title: true,
                shortDescription: true,
                pictureUrl: true,
                stack: true,
                link: true,
            },
        });

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
        const formData = await req.formData();

        const newProject = await createProjectFromFormData(formData);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}

