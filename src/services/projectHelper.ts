import { CardModel } from "@/app/lib/models/cardModel";
import { IProjectHelper } from "@/interfaces/IProjectHelper";
import { IBadgeService } from "@/interfaces/IBadgeService";
import { IProjectService } from "@/interfaces/IProjectService";

export class ProjectHelper implements IProjectHelper {
    private readonly badgeService: IBadgeService;
    private readonly projectService: IProjectService;

    constructor(projectService: IProjectService, badgeService: IBadgeService) {
        this.badgeService = badgeService;
        this.projectService = projectService;
    }

    async fetchProjectsWithBadges(): Promise<CardModel[]> {
        try {
            const projects = await this.projectService.fetchProjects();
            return await Promise.all(
                projects.map(async (project: CardModel) => {
                    try {
                        // Parse `stack` into a proper array of strings
                        if (typeof project.stack[0] === "string") {
                            project.stack = JSON.parse(project.stack[0]);
                        }

                        // Fetch badges for this project
                        const badges = await this.badgeService.fetchBadgesByBadgesId(project.stack);
                        return { ...project, stackBadges: badges };
                    } catch (error) {
                        console.error(`Error processing project ${project.id}:`, error);
                        return { ...project, stackBadges: [] }; // Fallback to empty badges
                    }
                })
            );

        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    }
}
