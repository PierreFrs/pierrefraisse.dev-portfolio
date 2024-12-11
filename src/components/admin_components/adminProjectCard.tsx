import React from "react";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

type ProjectCardProps = {
    project: CardModelWithBadges;
    onDelete: () => void;
};

export function AdminProjectCardComponent({ project, onDelete }: Readonly<ProjectCardProps>) {
    return (
        <div key={project.id} className="border p-4 rounded shadow-lg max-w-96">
            <ProjectPictureComponent project={project} />
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p>{project.shortDescription}</p>
            <ProjectStackGallery stack={project.stackBadges} />
            <CustomButtonComponent variant={"warning"} onClick={onDelete}>Delete</CustomButtonComponent>
        </div>
    );
}
