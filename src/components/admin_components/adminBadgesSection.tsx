"use client";

import BadgeUploadForm from "@/components/admin_components/badgeUploadForm";
import {Divider} from "@nextui-org/react";
import {AdminBadgesGallery} from "@/components/admin_components/adminBadgesGallery";
import React, {useEffect, useState} from "react";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {useServices} from "@/contexts/ServiceContext";

export function AdminBadgesSection() {
    const { badgeService } = useServices();
    const [badges, setBadges] = useState<StackBadge[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBadges();
    }, []);

    const loadBadges = async () => {
        try {
            const fetchedBadges = await badgeService.fetchBadges();
            setBadges(fetchedBadges);
        } catch (error: any) {
            setError("Failed to load badges. Please try again.");
            console.error(error);
        }
    };

    const addBadgeHandler = async (newBadge: StackBadge) => {
        try {
            setBadges((prevBadges) => [...prevBadges, newBadge]);
        } catch (error: any) {
            setError("Failed to add badge. Please try again.");
            console.error(error);
        }
    };

    const removeBadgeHandler = async (badgeId: string) => {
        try {
            await badgeService.removeBadge(badgeId);
            setBadges((prevBadges) =>
                prevBadges.filter((badge) => badge.id !== badgeId));
        } catch (error: any) {
            setError("Failed to remove badge. Please try again.");
            console.error(error);
        }
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upload Badges</h2>
                <BadgeUploadForm onBadgeAdded={addBadgeHandler} />
            </section>
            <Divider className="my-4"/>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Badges Gallery</h2>
                <AdminBadgesGallery badges={badges} onBadgeDeleted={removeBadgeHandler}/>
            </section>
        </>
    )
}