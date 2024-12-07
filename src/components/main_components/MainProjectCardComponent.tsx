import {CardModel} from "@/app/lib/models/cardModel";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import React from "react";

type MainProjectCardComponentProps = {
    project: CardModel;
};

export function MainProjectCardComponent({ project }: Readonly<MainProjectCardComponentProps>) {
    return (
        <div key={project.id} className="border p-4 rounded shadow-lg w-80 h-96">
            <ProjectPictureComponent size={150} project={project}/>
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p>{project.shortDescription}</p>
            <ProjectStackGallery stack={project.stackBadges as StackBadge[]}/>
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <CustomButtonComponent variant="primary">Visit Project</CustomButtonComponent>
                </a>
            )}
        </div>
    );
}