"use client";

import React, { useEffect, useState } from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import ProjectUploadForm from "@/components/admin_components/projectUploadForm";
import { Divider } from "@nextui-org/react";
import { AdminProjectsGallery } from "@/components/admin_components/adminProjectsGallery";
import {useServices} from "@/contexts/ServiceContext";

export function AdminProjectsSection() {
    const {badgeService, projectService, projectHelper} = useServices();
    const [projects, setProjects] = useState<CardModel[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const projects = await projectHelper.fetchProjectsWithBadges();
                setProjects(projects);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to fetch projects. Please try again.");
            }
        })();
    }, []);

    const addProject = async (project: CardModel) => {
        // Fetch badges for the new project and update it
        try {
            project.stack = JSON.parse(project.stack[0]);

            if (project.stack && project.stack.length > 0) {
                const badges = await badgeService.fetchBadgesByBadgesId(project.stack);
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
