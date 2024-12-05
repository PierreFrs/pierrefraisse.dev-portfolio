import React from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";

type ProjectCardProps = {
    project: CardModel;
};

export function AdminProjectCardComponent({ project }: Readonly<ProjectCardProps>) {
        async function deleteProject(id: string) {
            try {
                const response = await fetch(`/api/projectGallery/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    console.error(`Failed to delete project. HTTP error! status: ${response.status}`);
                    return;
                }
                console.log("Project deleted successfully");
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }

    return (
        <div key={project.id} className="border p-4 rounded shadow-lg max-w-fit">
            <ProjectPictureComponent size={150} project={project} />
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p>{project.shortDescription}</p>
            <ProjectStackGallery stack={project.stackBadges as StackBadge[]} />
            <CustomButtonComponent variant={"warning"} onClick={() => deleteProject(project.id)}>Delete</CustomButtonComponent>
        </div>
    );
}
