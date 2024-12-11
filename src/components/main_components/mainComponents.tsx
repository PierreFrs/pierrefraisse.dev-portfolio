"use client";

import React, {useEffect, useState} from "react";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";
import {fetchProjectsWithBadges} from "@/app/lib/data/projectActions";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

export default function MainComponentsComponent() {
    const [projects, setProjects] = useState<CardModelWithBadges[]>([]);

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