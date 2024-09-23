import {StackBadge} from "@/app/lib/models/stackBadgeModel";

export type CardModel = {
    id: string;
    title: string;
    shortDescription: string;
    pictureUrl: string;
    badgesArray: StackBadge[];
    link: string;
};