"use client";

import { useEffect, useState } from "react";
import { fetchHeroDescription } from "@/app/lib/data/heroDescriptionData";

export default function HeroDescription() {
    const [description, setDescription] = useState<string>("");
    const language = "en";
    
    useEffect(() => {
        async function loadDescription() {
            const data = await fetchHeroDescription(language);
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
