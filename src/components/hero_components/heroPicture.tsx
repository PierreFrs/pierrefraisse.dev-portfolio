"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {fetchHeroPicture} from "@/app/lib/data/heroPictureActions";
import {useTranslations} from "next-intl";

type HeroPictureProps = {
    size: number;
    className?: string;
};

export default function HeroPicture({ className }: Readonly<HeroPictureProps>) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [messageKey, setMessageKey] = useState<string | null>(null);

    const t = useTranslations("HomePage");

    useEffect(() => {
        (async () => {
            try {
                const { url, messageKey } = await fetchHeroPicture();
                console.log("DEBUG: Fetched image URL:", url);
                setImageUrl(url);
                setMessageKey(messageKey);
            } catch (error: any) {
                console.error("Failed to load hero picture", error);
                setMessageKey("hero-picture-load-error");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <p>{t("loading")}</p>;
    }

    if (!imageUrl) {
        return <p>{t(messageKey!)}</p>;
    }

    return (
        <div className={`hero-picture-container ${className ?? ""}`}>
            <Image src={`/api/blob_storage?path=${imageUrl}`}
                   alt="Your host picture"
                   className="hero-picture"
                   unoptimized={true}
                   width={1}
                   height={1}
            />
        </div>

    );
}
