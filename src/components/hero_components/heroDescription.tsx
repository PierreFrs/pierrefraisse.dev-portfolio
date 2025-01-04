"use client";

import { useEffect, useState } from "react";
import { fetchHeroDescription } from "@/app/lib/data/heroDescriptionActions";
import {useLocale, useTranslations} from "next-intl";

export default function HeroDescription() {
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [messageKey, setMessageKey] = useState<string | null>(null);

    const locale = useLocale();

    const t = useTranslations("HomePage");


    useEffect(() => {
        (async () => {
            try {
                const { description, messageKey } = await fetchHeroDescription(locale);
                setDescription(description);
                setMessageKey(messageKey);
            } catch (error) {
                console.error("Failed to fetch hero description:", error);
                setMessageKey("hero-description-load-error");
            } finally {
                setLoading(false);
            }
        })();
    }, [locale]);

    if (loading) {
        return <p>{t("loading")}</p>;
    }

    if (!description) {
        return <p>{t(messageKey!)}</p>;
    }

    return <p className="hero-description">{description}</p>;
}
