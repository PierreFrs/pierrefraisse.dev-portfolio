"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type HeroPictureProps = {
    size: number;
};

export default function HeroPicture({size}: Readonly<HeroPictureProps>) {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/heroPicture`);
                const data = await response.json();
                setImageUrl(data.url);
            } catch (error) {
                console.error("Error fetching the hero picture:", error);
            }
        })();
    }, []);

    if (!imageUrl) {
        return <p>Loading...</p>;
    }
    
    return <Image src={imageUrl} 
                  alt="Your host picture" 
                  className="rounded-2xl shadow-lg"
                  width={size}
                  height={size}
                  style={{ width: size ? "auto" : "auto", height: size ? `${size}px` : "auto" }}
    />;
}
