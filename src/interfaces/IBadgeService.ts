// src/interfaces/IBadgeService.ts

import { StackBadge } from "@/app/lib/models/stackBadgeModel";

export interface IBadgeService {
    fetchBadges(): Promise<StackBadge[]>;
    fetchBadgeById(badgeId: string): Promise<StackBadge | null>;
    fetchBadgesByBadgesId(badgesIds: string[]): Promise<StackBadge[]>;
    addBadge(formData: FormData): Promise<StackBadge>;
    removeBadge(badgeId: string): Promise<void>;
}
