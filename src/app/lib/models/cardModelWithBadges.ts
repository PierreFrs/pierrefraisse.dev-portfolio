import {StackBadge} from "@/app/lib/models/stackBadgeModel";

export type CardModelWithBadges = {
    id: string;
    title: string;
    shortDescription: string;
    pictureUrl: string;
    stack: string[];
    stackBadges: StackBadge[];
    link?: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};