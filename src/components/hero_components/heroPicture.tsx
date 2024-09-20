"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroPicture() {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        async function loadPicture() {
            const response = await fetch(`/api/heroPicture`);
            const data = await response.json();
            setImageUrl(data.url);
        }
        loadPicture();
    }, []);
    if (!imageUrl) {
        return <p>Loading...</p>;
    }
    
    return <Image src={imageUrl} 
                  alt="Your host picture" 
                  className="rounded-full" 
                  width="1200" 
                  height="1200"/>;
}
