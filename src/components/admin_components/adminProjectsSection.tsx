"use client";

import React, { useEffect, useState } from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import ProjectUploadForm from "@/components/admin_components/projectUploadForm";
import { Divider } from "@nextui-org/react";
import { AdminProjectsGallery } from "@/components/admin_components/adminProjectsGallery";

export function AdminProjectsSection() {
    const [projects, setProjects] = useState<CardModel[]>([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projectGallery");
            if (!response.ok) {
                console.error("Failed to fetch projects. HTTP error!", response.status);
                return;
            }
            const data: CardModel[] = await response.json();

            // Fetch stack badges for each project
            const updatedProjects = await Promise.all(
                data.map(async (project) => {
                    try {
                        project.stack = JSON.parse(project.stack[0]); // Parsing the stack field

                        if (project.stack && project.stack.length > 0) {
                            const badges = await fetchStackBadgesByIds(project.stack);
                            return { ...project, stackBadges: badges }; // Adding the `stackBadges` property
                        }

                        return project; // Return the project even if stack badges are not found
                    } catch (e) {
                        console.error(`Error processing project ${project.id}:`, e);
                        return project;
                    }
                })
            );

            setProjects(updatedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    async function fetchStackBadgesByIds(stackIds: string[]): Promise<StackBadge[]> {
        const badges: StackBadge[] = [];

        for (const id of stackIds) {
            try {
                const response = await fetch(`/api/stackBadges/${id}`);
                if (!response.ok) {
                    console.error(`Failed to fetch badge ${id}. HTTP error! status: ${response.status}`);
                    continue;
                }
                const badge: StackBadge = await response.json();
                badges.push(badge);
            } catch (error) {
                console.error(`Error fetching badge with ID ${id}:`, error);
            }
        }
        return badges;
    }

    const addProject = async (project: CardModel) => {
        // Fetch badges for the new project and update it
        try {
            project.stack = JSON.parse(project.stack[0]);

            if (project.stack && project.stack.length > 0) {
                const badges = await fetchStackBadgesByIds(project.stack);
                const updatedProject = { ...project, stackBadges: badges };
                setProjects((prevProjects) => [...prevProjects, updatedProject]);
            } else {
                setProjects((prevProjects) => [...prevProjects, project]);
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const removeProject = async (projectId: string) => {
        try {
            const response = await fetch(`/api/projectGallery/${projectId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Project deleted successfully");
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.id !== projectId)
                );
            } else {
                console.error("Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upload Projects</h2>
                <ProjectUploadForm onProjectAdded={addProject} />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
                <AdminProjectsGallery projects={projects} onProjectDeleted={removeProject} />
            </section>
        </>
    );
}
