import React from "react";
import {AdminProjectCardComponent} from "@/components/admin_components/adminProjectCard";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

type AdminProjectsGalleryProps = {
    projects: CardModelWithBadges[];
    onProjectDeleted: (projectId: string) => void;
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
