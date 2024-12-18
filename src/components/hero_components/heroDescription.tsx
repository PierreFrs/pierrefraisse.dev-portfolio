"use client";

import { useEffect, useState } from "react";
import { fetchHeroDescription } from "@/app/lib/data/heroDescriptionActions";
import {useLocale} from "next-intl";

export default function HeroDescription() {
    const [description, setDescription] = useState<string>("");
    const locale = useLocale();
    
    useEffect(() => {
        async function loadDescription() {
            const data = await fetchHeroDescription(locale);
            if (data?.description) {
                setDescription(data.description);
            } else if (data?.message) {
                setDescription(data.message);
            }
        }
        loadDescription();
    }, []);

    return <p className="hero-description">{description}</p>;
}
