// src/services/badgeService.ts

import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import {IBadgeService} from "@/interfaces/IBadgeService";

export class BadgeService implements IBadgeService {

    // Service to fetch all badges
    async fetchBadges(): Promise<StackBadge[]> {
        const response = await fetch("/api/stackBadges");
        if (!response.ok) {
            throw new Error(`Failed to fetch badges. HTTP error! status: ${response.status}`);
        }
        return await response.json();
    };

    // Service to fetch badges by project id
    async fetchBadgesByProjectId(badgesIds: string[]): Promise<StackBadge[]> {
        const badges: StackBadge[] = [];

        for (const id of badgesIds) {
            const response = await fetch(`/api/stackBadges/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch badge ${id}. HTTP error! status: ${response.status}`);
            }

            const badge: StackBadge = await response.json();
            badges.push(badge);
        }

        return badges;
    }

    // Service to add a badge
    async addBadge(formData: FormData): Promise<StackBadge> {
        const response = await fetch("/api/stackBadges", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error("Error adding badge");
        }
        return await response.json();
    };

    // Service to delete a badge
    async removeBadge(badgeId: string): Promise<void> {
        const response = await fetch(`/api/stackBadges/${badgeId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete badge");
        }
    };
}

