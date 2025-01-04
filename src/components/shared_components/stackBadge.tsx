import React from "react";
import Image from "next/image";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";

type StackBadgeProps = {
    size?: number;
    badge: StackBadge;
};

export function StackBadgeComponent({ size, badge }: Readonly<StackBadgeProps>) {
    const placeholderImageUrl = "/images/placeholder.png";
    const sanitizedBadgeName = badge.name.replace(/_/g, " ");

    return (
        <div className="flex flex-col items-center gap-1">
            <Image
                src={`/api/blob_storage?path=${badge.pictureUrl || placeholderImageUrl}`}
                alt={sanitizedBadgeName || "Badge"}
                width={size}
                height={size}
                style={{ width: size ? `${size}px` : "auto", height: size ? `${size}px` : "auto" }}
                priority={true}
            />
            <span className="font-bold mt-2 text-center">{sanitizedBadgeName}</span>
        </div>
    );
}
