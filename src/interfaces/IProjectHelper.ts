import {CardModel} from "@/app/lib/models/cardModel";

export interface IProjectHelper {
    fetchProjectsWithBadges(): Promise<CardModel[]>;
}