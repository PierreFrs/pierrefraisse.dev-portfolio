"use client";

import React, { useEffect, useState } from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import ProjectUploadForm from "@/components/admin_components/projectUploadForm";
import { Divider } from "@nextui-org/react";
import { AdminProjectsGallery } from "@/components/admin_components/adminProjectsGallery";
import {useServices} from "@/contexts/ServiceContext";

export function AdminProjectsSection() {
    const {badgeService, projectService} = useServices();
    const [projects, setProjects] = useState<CardModel[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const projects = await projectService.fetchProjects();
            // Fetch stack badges for each project
            const updatedProjects = await Promise.all(
                projects.map(async (project) => {
                    try {
                        project.stack = JSON.parse(project.stack[0]); // Parsing the stack field

                        if (project.stack && project.stack.length > 0) {
                            const badges = await badgeService.fetchBadgesByProjectId(project.stack);
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

    const addProject = async (project: CardModel) => {
        // Fetch badges for the new project and update it
        try {
            project.stack = JSON.parse(project.stack[0]);

            if (project.stack && project.stack.length > 0) {
                const badges = await badgeService.fetchBadgesByProjectId(project.stack);
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
            await projectService.removeProject(projectId);
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== projectId));
        } catch (error: any) {
            setError("Failed to remove project. Please try again.");
            console.error(error);
        }
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
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
