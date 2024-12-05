import React from "react";
import Image from "next/image";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";

type StackBadgeProps = {
    height: number;
    badge: StackBadge;
};

export function StackBadgeComponent({ height, badge }: Readonly<StackBadgeProps>) {
    const placeholderImageUrl = "/images/placeholder.png";
    const sanitizedBadgeName = badge.name.replace(/_/g, " ");

    return (
        <div className="flex flex-col items-center gap-1 w-24">
            <div style={{ height, width: height }}>
                <Image
                    src={badge.pictureUrl || placeholderImageUrl}
                    alt={sanitizedBadgeName || "Badge"}
                    width={height}
                    height={height}
                    objectFit="contain"
                    priority={true}
                />
            </div>
            <span className="font-bold mt-2 text-center">{sanitizedBadgeName}</span>
        </div>
    );
}
