"use client";

import React, { useEffect, useState } from "react";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import { CardModel } from "@/app/lib/models/cardModel";
import {AdminProjectCardComponent} from "@/components/admin_components/adminProjectCard";

export function AdminProjectsGallery() {
    const [projects, setProjects] = useState<CardModel[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                // Fetch all projects
                const response = await fetch("/api/projectGallery");
                if (!response.ok) {
                    console.error(`Failed to delete project. HTTP error! status: ${response.status}`);
                    return;
                }
                const data: CardModel[] = await response.json();

                // Fetch stack badges for each project
                const updatedProjects = await Promise.all(
                    data.map(async (project) => {
                            project.stack = JSON.parse(project.stack[0]);

                        if (project.stack && project.stack.length > 0) {
                            const badges = await fetchStackBadgesByIds(project.stack);
                            return { ...project, stackBadges: badges }; // Adding a new property `stackBadges`
                        }
                        return project;
                    })
                );

                setProjects(updatedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }

        // Function to fetch stack badges by their IDs
        async function fetchStackBadgesByIds(stackIds: string[]): Promise<StackBadge[]> {
            const badges: StackBadge[] = [];

            for (const id of stackIds) {
                try {
                    const badgeResponse = await fetch(`/api/stackBadges/${id}`);
                    if (!response.ok) {
                        console.error(`Failed to delete project. HTTP error! status: ${response.status}`);
                        return;
                    }
                    const badge: StackBadge = await badgeResponse.json();
                    badges.push(badge);
                } catch (error) {
                    console.error(`Error fetching badge with ID ${id}:`, error);
                }
            }
            return badges;
        }

        fetchProjects();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <AdminProjectCardComponent project={project} key={project.id}/>
            ))}
        </div>
    );
}
