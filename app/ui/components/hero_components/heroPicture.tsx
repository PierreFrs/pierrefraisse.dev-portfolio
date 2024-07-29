"use client";

import { useEffect, useState } from "react";
import { fetchHeroPicture } from "@/app/lib/data/heroPictureData";

export default function HeroPicture() {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        async function loadPicture() {
            const data = await fetchHeroPicture();
            setImageUrl(data.imageUrl);
        }
        loadPicture();
    }, []);

    return <img src={imageUrl} alt="Your Name" className="rounded-full w-48 h-48" />;
}
