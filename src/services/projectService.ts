// src/services/projectService.ts

import { CardModel } from "@/app/lib/models/cardModel";
import {IProjectService} from "@/interfaces/IProjectService";

export class ProjectService implements IProjectService {
    async fetchProjects(): Promise<CardModel[]> {
        const response = await fetch("/api/projectGallery");
        if (!response.ok) {
            throw new Error(`Failed to fetch projects. HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async addProject(formData: FormData): Promise<CardModel> {
        const response = await fetch("/api/projectGallery", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error("Error adding project");
        }
        return await response.json();
    }

    async removeProject(projectId: string): Promise<void> {
        const response = await fetch(`/api/projectGallery/${projectId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete project");
        }
    }
}