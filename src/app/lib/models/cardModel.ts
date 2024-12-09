import {StackBadge} from "@/app/lib/models/stackBadgeModel";

export type CardModel = {
    id: string;
    title: string;
    shortDescription: string;
    pictureUrl: string;
    stack: string[];
    stackBadges: StackBadge[];
    link?: string;
};