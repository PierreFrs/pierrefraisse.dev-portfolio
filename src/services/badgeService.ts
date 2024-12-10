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

    async fetchBadgeById(id: string): Promise<StackBadge | null> {
        try {
            const response = await fetch(`/api/stackBadges/${id}`);
            if (!response.ok) {
                // Handle specific error codes
                if (response.status === 404) {
                    console.warn(`Badge with ID ${id} not found (404).`);
                    return null; // Return null for a missing badge
                }
                console.error(`Failed to fetch badge ${id}. HTTP error! status: ${response.status}`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching badge ${id}:`, error);
            return null; // Ensure the error doesn't break the flow
        }
    }


    // Service to fetch multiple badges for project
    async fetchBadgesByBadgesId(badgesIds: string[]): Promise<StackBadge[]> {
        const badgeFetchPromises = badgesIds.map((id) => this.fetchBadgeById(id));
        const badges = await Promise.all(badgeFetchPromises);

        // Filter out any null values (badges not found)
        return badges.filter((badge): badge is StackBadge => badge !== null);
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

