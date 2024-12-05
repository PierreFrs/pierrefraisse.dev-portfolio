"use client";

import { useEffect, useState } from "react";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import { StackBadgeComponent } from "@/components/shared_components/stackBadge";
import { CustomButtonComponent } from "@/components/shared_components/CustomButton";

export function AdminBadgesGallery() {
    const [badges, setBadges] = useState<StackBadge[]>([]);

    useEffect(() => {
        async function fetchBadges() {
            try {
                const response = await fetch("/api/stackBadges");
                if (!response.ok) {
                    console.error(`Failed to delete project. HTTP error! status: ${response.status}`);
                    return;
                }
                const data: StackBadge[] = await response.json();
                setBadges(data);
            } catch (error) {
                console.error("Error fetching badges:", error);
            }
        }

        fetchBadges();
    }, []);

    async function deleteBadge(id: string) {
        try {
            const response = await fetch(`/api/stackBadges/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error(`Failed to delete project. HTTP error! status: ${response.status}`);
                return;
            }
            console.log("Badge deleted successfully");
            setBadges((prevBadges) => prevBadges.filter((badge) => badge.id !== id));
        } catch (error) {
            console.error("Error deleting badge:", error);
        }
    }

    return (
        <div className="max-w-120">
            <ul className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                    <li key={badge.id} className="flex flex-col items-center gap-2 mb-2">
                        <StackBadgeComponent size={30} badge={badge} />
                        <CustomButtonComponent
                            variant="warning" // Just set this to "warning" for delete
                            onClick={() => deleteBadge(badge.id)}
                        >
                            Delete
                        </CustomButtonComponent>
                    </li>
                ))}
            </ul>
        </div>
    );
}
