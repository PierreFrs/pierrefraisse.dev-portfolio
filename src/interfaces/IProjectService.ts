// src/interfaces/IProjectService.ts

import {CardModel} from "@/app/lib/models/cardModel";

export interface IProjectService {
    fetchProjects(): Promise<CardModel[]>;
    addProject(formData: FormData): Promise<CardModel>;
    removeProject(projectId: string): Promise<void>;
}