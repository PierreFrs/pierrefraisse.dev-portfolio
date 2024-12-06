"use client";

import BadgeUploadForm from "@/components/admin_components/badgeUploadForm";
import {Divider} from "@nextui-org/react";
import {AdminBadgesGallery} from "@/components/admin_components/adminBadgesGallery";
import React, {useEffect, useState} from "react";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";

export function AdminBadgesSection() {
    const [badges, setBadges] = useState<StackBadge[]>([]);

    useEffect(() => {
        fetchBadges();
    }, []);

    const fetchBadges = async () => {
        try {
            const response = await fetch("/api/stackBadges");
            if (!response.ok) {
                console.error("Failed to fetch badges. HTTP error!", response.status);
                return;
            }
            const data: StackBadge[] = await response.json();
            setBadges(data);
        } catch (error) {
            console.error("Error fetching badges:", error);
        }
    }

    const addBadge = (newBadge: StackBadge) => {
        setBadges((prevBadges) => [...prevBadges, newBadge]);
    };

    const removeBadge = async (badgeId: string) => {
        try {
            const response = await fetch(`/api/stackBadges/${badgeId}`, { method: "DELETE" });
            if (response.ok) {
                console.log(`Badge with ID ${badgeId} deleted successfully`);
                setBadges((prevBadges) =>
                    prevBadges.filter((badge) => badge.id !== badgeId)
            );
            } else {
                console.error("Failed to delete badge");
            }
        } catch (error) {
            console.error("Error deleting badge:", error);
        }
    };

    return (
        <>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upload Badges</h2>
                <BadgeUploadForm onBadgeAdded={addBadge}/>
            </section>
            <Divider className="my-4"/>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Badges Gallery</h2>
                <AdminBadgesGallery badges={badges} onBadgeDeleted={removeBadge}/>
            </section>
        </>
    )
}