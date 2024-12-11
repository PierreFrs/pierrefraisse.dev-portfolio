"use client";

import React, {useEffect, useState} from "react";
import {CardModel} from "@/app/lib/models/cardModel";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";
import {fetchProjectsWithBadges} from "@/app/lib/data/projectActions";

export default function MainComponentsComponent() {
    const [projects, setProjects] = useState<CardModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const projects = await fetchProjectsWithBadges();
                setProjects(projects);
            } catch {
                console.error("Failed to fetch projects.");
            }
        })();
    }, []);

    return (
        <section className="homepage">
            <Hero/>
            <ProjectsGallery projects={projects}/>
            <Contact/>
        </section>
    );
}