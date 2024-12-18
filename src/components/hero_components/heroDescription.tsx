"use client";

import { useEffect, useState } from "react";
import { fetchHeroDescription } from "@/app/lib/data/heroDescriptionActions";
import {useLocale} from "next-intl";

export default function HeroDescription() {
    const [description, setDescription] = useState<string>("");
    const locale = useLocale();

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchHeroDescription(locale);
                if (data?.description) {
                    setDescription(data.description);
                } else if (data?.message) {
                    setDescription(data.message);
                }
            } catch (error) {
                console.error("Failed to fetch hero description:", error);
            }
        })();
    }, [locale]);

    return <p className="hero-description">{description}</p>;
}
