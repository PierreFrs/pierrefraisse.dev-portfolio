// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import React, { useEffect, useState } from "react";
import Image from "next/image"
import {MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {Button} from "@nextui-org/button";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    )

    return (
        <Button
            as="a" // Render as an anchor tag
            href="#"
            isIconOnly
            onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            className="header-button"
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="w-6 h-6 header-icon" />
            ) : (
                <MoonIcon className="w-6 h-6 header-icon" />
            )}
        </Button>
    );
}