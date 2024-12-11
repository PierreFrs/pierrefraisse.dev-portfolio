"use client";

import React, { useEffect, useState } from "react";
import { MainProjectCardComponent } from "@/components/main_components/MainProjectCardComponent";
import useEmblaCarousel from "embla-carousel-react";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

type ProjectGalleryProps = {
    projects: CardModelWithBadges[];
};

export default function ProjectsGallery({ projects }: Readonly<ProjectGalleryProps>) {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect(); // Set initial selected index
    }, [emblaApi]);

    return (
        <section id="projects" className="homepage-section flex flex-col">
            <h2 className="title section-title">Projets</h2>
            <div className="project-gallery embla" ref={emblaRef}>
                <div className="embla__container">
                    {projects.map((project) => (
                        <div className="embla__slide" key={project.id}>
                            <MainProjectCardComponent project={project} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls">
                <div className="embla__dots">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
