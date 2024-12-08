import React from "react";
import {MainProjectCardComponent} from "@/components/main_components/MainProjectCardComponent";
import {CardModel} from "@/app/lib/models/cardModel";

type ProjectGalleryProps = {
    projects: CardModel[];
};

export default function ProjectsGallery({ projects }: Readonly<ProjectGalleryProps>) {
  return (
      <section id="projects" className="homepage-section flex flex-col">
          <h2 className="title section-title">Projets</h2>
          <div className="project-gallery">
              {projects.map((project) => (
                  <MainProjectCardComponent
                      project={project}
                      key={project.id}
                  />
              ))}
          </div>
      </section>
  );
}