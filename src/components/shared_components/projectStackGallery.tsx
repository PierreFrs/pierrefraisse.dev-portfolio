import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import React from "react";

type ProjectStackGalleryProps = {
    stack: StackBadge[];
};

export function ProjectStackGallery({ stack }: Readonly<ProjectStackGalleryProps>) {
    return (
        <div className="my-4">
            <p className="font-bold">Stack:</p>
            <ul className="flex flex-wrap mt-2 gap-2">
                {stack?.map((badge: StackBadge) => (
                    <li key={badge.id} className="rounded text-sm w-16">
                        <StackBadgeComponent size={20} badge={badge}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}