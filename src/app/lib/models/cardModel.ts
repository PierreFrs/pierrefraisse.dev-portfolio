import {Translation} from "@/app/lib/models/translations";

export type CardModel = {
    id: string;
    pictureUrl: string;
    stack: string[];
    link?: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    translations: Translation[];
};