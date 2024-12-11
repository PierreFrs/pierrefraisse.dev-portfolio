"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {fetchHeroPicture} from "@/app/lib/data/heroPictureActions";

type HeroPictureProps = {
    size: number;
};

export default function HeroPicture({size}: Readonly<HeroPictureProps>) {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        loadPicture();
    }, []);

    const loadPicture = async () => {
        try {
            const picture = await fetchHeroPicture();
            if (picture?.url) {
                setImageUrl(picture.url);
            } else {
                console.warn("No hero picture URL returned");
            }
        } catch (error: any) {
            console.error("Failed to load hero picture", error);
        }
    };

    if (!imageUrl) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="hero-picture-container">
            <Image src={imageUrl}
                   alt="Your host picture"
                   className="hero-picture"
                   width={size}
                   height={size}
            />
        </div>

    );
}
