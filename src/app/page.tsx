"use client";

import React, {useEffect, useState} from "react";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";
import {fetchProjectsWithBadges} from "@/app/lib/data/projectActions";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

export default function MainComponentsComponent() {
    const [projects, setProjects] = useState<CardModelWithBadges[]>([]);
    const [messageKey, setMessageKey] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { projects, messageKey } = await fetchProjectsWithBadges();
                if (projects) {
                    setProjects(projects);
                } else if (messageKey) {
                    setMessageKey(messageKey);
                }
            } catch {
                setMessageKey("gallery-load-error");
            }
        })();
    }, []);

    return (
        <section className="homepage">
            <Hero/>
            <ProjectsGallery projects={projects} messageKey={messageKey}/>
            <Contact/>
        </section>
    );
}