"use client";

import React, { useEffect, useState } from "react";
import ProjectUploadForm from "@/components/admin_components/projectUploadForm";
import { Divider } from "@nextui-org/react";
import { AdminProjectsGallery } from "@/components/admin_components/adminProjectsGallery";
import {deleteProject, fetchProjectsWithBadges} from "@/app/lib/data/projectActions";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

export function AdminProjectsSection() {
    const [projects, setProjects] = useState<CardModelWithBadges[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const projects = await fetchProjectsWithBadges();
                setProjects(projects);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to fetch projects. Please try again.");
            }
        })();
    }, []);

    const uploadProject = async (newProject: CardModelWithBadges) => {
        try {
            setProjects((prev) => [...prev, newProject]);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const removeProject = async (projectId: string) => {
        try {
            await deleteProject(projectId);
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
                <ProjectUploadForm onProjectAdded={uploadProject} />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
                <AdminProjectsGallery projects={projects} onProjectDeleted={removeProject} />
            </section>
        </>
    );
}
