import React from "react";
import {MainProjectCardComponent} from "@/components/main_components/MainProjectCardComponent";
import {CardModel} from "@/app/lib/models/cardModel";

type ProjectGalleryProps = {
    projects: CardModel[];
};

export default function ProjectsGallery({ projects }: Readonly<ProjectGalleryProps>) {
  return (
      <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                  <MainProjectCardComponent
                      project={project}
                      key={project.id}
                  />
              ))}
          </div>
      </>
  );
}