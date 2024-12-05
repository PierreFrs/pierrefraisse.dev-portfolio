import React from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";

type ProjectCardProps = {
    project: CardModel;
};

export function AdminProjectCardComponent({ project }: Readonly<ProjectCardProps>) {
        async function deleteProject(id: string) {
            try {
                const response = await fetch(`/api/projectGallery/${project.id}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }

    return (
        <div key={project.id} className="border p-4 rounded shadow-lg">
            <ProjectPictureComponent height={150} project={project} />
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p className="text-gray-600">{project.shortDescription}</p>
            <div className="my-4">
                <strong>Stack:</strong>
                <ul className="flex flex-wrap gap-2 mt-2">
                    {project.stackBadges?.map((badge: StackBadge) => (
                        <li key={badge.id} className="bg-gray-200 rounded px-2 py-1 text-sm">
                            <StackBadgeComponent height={30} badge={badge} />
                        </li>
                    ))}
                </ul>
            </div>
            <CustomButtonComponent variant={"warning"} onClick={() => deleteProject(project.id)}>Delete</CustomButtonComponent>
        </div>
    );
}
