import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {Translation} from "@/app/lib/models/translations";

export type CardModelWithBadges = {
    id: string;
    pictureUrl: string;
    stack: string[];
    stackBadges: StackBadge[];
    link?: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    translations: Translation[];
};