"use client";

import React, { useEffect, useState } from "react";
import { MainProjectCardComponent } from "@/components/main_components/MainProjectCardComponent";
import useEmblaCarousel from "embla-carousel-react";
import { CardModelWithBadges } from "@/app/lib/models/cardModelWithBadges";
import { useTranslations } from "next-intl";

type ProjectGalleryProps = {
    projects: CardModelWithBadges[] | null;
    messageKey?: string | null;
};

export default function ProjectsGallery({ projects, messageKey }: Readonly<ProjectGalleryProps>) {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const t = useTranslations("HomePage");

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect(); // Set initial selected index
    }, [emblaApi]);

    let content;

    if (messageKey) {
        content = <p>{t(messageKey)}</p>;
    } else if (!projects || projects.length === 0) {
        content = <p>{t("gallery-no-projects")}</p>;
    } else {
        content = (
            <>
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
            </>
        );
    }

    return (
        <section id="projects" className="homepage-section flex flex-col">
            <h2 className="title section-title">{t("projects-title")}</h2>
            {content}
        </section>
    );
}
