// src/lib/data/projectActions.ts

"use server";

import { PrismaClient } from "@prisma/client";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";
import {fetchBadgeById} from "@/app/lib/data/badgeActions";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {createProjectFromFormData} from "@/app/lib/helpers/projectHelper";

const prisma = new PrismaClient();

export async function fetchProjectsWithBadges(): Promise<{
    projects: CardModelWithBadges[] | null,
    messageKey?: string,
}> {
    try {
        const projects = await prisma.projectCard.findMany({
            include: {
                translations: { select: { title: true, shortDescription: true, language: true },},
            },
        });

        if (projects.length === 0) {
            return { projects: null, messageKey: "gallery-no-projects" };
        }

        const enhancedProjects = await Promise.all(
            projects.map(async (project) => {
                let stack: string[] = project.stack;
                if (typeof project.stack === "string") {
                    try {
                        stack = JSON.parse(project.stack);
                    } catch (error) {
                        console.warn(`Failed to parse stack for project ${project.id}:`, error);
                        stack = [];
                    }
                }

                const badges: StackBadge[] = (
                    await Promise.all(
                        stack.map(async (badgeId) => await fetchBadgeById(badgeId))
                    )
                ).filter((badge): badge is StackBadge => badge !== null);

                return {...project, stack, stackBadges: badges } as CardModelWithBadges;
            })
        );

        return { projects: enhancedProjects }; // Fallback to empty badges
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects with badges");
    }
}

export async function addProject(formData: FormData): Promise<CardModelWithBadges> {
    // Create the project using helper
    const project = await createProjectFromFormData(formData);

    const stackBadges = await Promise.all(
        project.stack.map(async (badgeId: string) => await fetchBadgeById(badgeId))
    );

    return {
        ...project,
        stackBadges: stackBadges.filter((badge) => badge !== null),
        translations: project.translations || [],
    };
}

export async function deleteProject(id: string) {
    return await prisma.projectCard.delete({
        where: { id },
    });
}
