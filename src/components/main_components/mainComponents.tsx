"use client";

import React, {useEffect, useState} from "react";
import {CardModel} from "@/app/lib/models/cardModel";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";
import {useServices} from "@/contexts/ServiceContext";

export default function MainComponentsComponent() {
    const {projectHelper} = useServices();
    const [projects, setProjects] = useState<CardModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const projects = await projectHelper.fetchProjectsWithBadges();
                setProjects(projects);
            } catch {
                console.error("Failed to fetch projects.");
            }
        })();
    }, []);

    return (
        <>
            <section id="about" className="mt-16">
                <Hero/>
            </section>
            <section id="projects" className="mt-16 p-4">
                <ProjectsGallery projects={projects}/>
            </section>
            <section id="contact" className="mt-16 max-w-96 p-4">
                <Contact/>
            </section>
        </>
    );
}