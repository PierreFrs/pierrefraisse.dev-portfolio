"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {fetchHeroPicture} from "@/app/lib/data/heroPictureActions";

type HeroPictureProps = {
    size: number;
    className?: string;
};

export default function HeroPicture({ className }: Readonly<HeroPictureProps>) {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const picture = await fetchHeroPicture();
                if (picture?.url) {
                    setImageUrl(picture.url);
                } else {
                    console.warn("No hero picture URL returned");
                }
            } catch (error: any) {
                console.error("Failed to load hero picture", error); }
            })();
    }, []);

    if (!imageUrl) {
        return <p>Loading...</p>;
    }

    return (
        <div className={`hero-picture-container ${className ?? ""}`}>
            <Image src={imageUrl}
                   alt="Your host picture"
                   className="hero-picture"
                   unoptimized={true}
                   width={1}
                   height={1}
            />
        </div>

    );
}
