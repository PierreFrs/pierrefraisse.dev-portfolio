import React from "react";
import { CardModel } from "@/app/lib/models/cardModel";
import {AdminProjectCardComponent} from "@/components/admin_components/adminProjectCard";

type AdminProjectsGalleryProps = {
    projects: CardModel[];
    onProjectDeleted: (projectId: string) => void; // Callback to remove project
};

export function AdminProjectsGallery({ projects, onProjectDeleted }: Readonly<AdminProjectsGalleryProps>) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <AdminProjectCardComponent
                    project={project}
                    key={project.id}
                    onDelete={() => onProjectDeleted(project.id)}
                />
            ))}
        </div>
    );
}
