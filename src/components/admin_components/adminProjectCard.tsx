import React from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";

type ProjectCardProps = {
    project: CardModel;
    onDelete: () => void;
};

export function AdminProjectCardComponent({ project, onDelete }: Readonly<ProjectCardProps>) {

    return (
        <div key={project.id} className="border p-4 rounded shadow-lg max-w-96">
            <ProjectPictureComponent size={150} project={project} />
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p>{project.shortDescription}</p>
            <ProjectStackGallery stack={project.stackBadges as StackBadge[]} />
            <CustomButtonComponent variant={"warning"} onClick={onDelete}>Delete</CustomButtonComponent>
        </div>
    );
}
