"use client";

import React, {useEffect, useState} from "react";
import {useServices} from "@/contexts/ServiceContext";
import {CardModel} from "@/app/lib/models/cardModel";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";

export default function MainComponentsComponent() {
    const {badgeService, projectService} = useServices();
    const [projects, setProjects] = useState<CardModel[]>([]);

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

    return (
        <>
            <section id="about">
                <Hero/>
            </section>
            <section id="projects">
                <ProjectsGallery projects={projects}/>
            </section>
            <section id="contact">
                <Contact/>
            </section>
        </>
    );
}