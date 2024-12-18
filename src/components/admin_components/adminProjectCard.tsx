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
            <div className="mt-4">
                <h2 className="text-xl font-bold">Translations</h2>
                {project.translations.map((translation) => (
                    <div key={translation.language} className="mb-4">
                        <h3 className="font-semibold">
                            {translation.language === "en" ? "English" : "French"}
                        </h3>
                        <p className="text-lg font-bold">{translation.title}</p>
                        <p>{translation.shortDescription}</p>
                    </div>
                ))}
            </div>
            <ProjectStackGallery stack={project.stackBadges} />
            <CustomButtonComponent variant="warning" onClick={onDelete}>
                Delete
            </CustomButtonComponent>
        </div>
    );
}
