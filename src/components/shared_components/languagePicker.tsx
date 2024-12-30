'use client';

import { useLocale } from 'next-intl';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { LanguageIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import React, {useEffect, useState} from "react";
import Image from "next/image";

export const LanguagePicker = () => {
    const [mounted, setMounted] = useState(false)
    const currentLocale = useLocale(); // Get the current locale

    const setLocale = (locale: string) => {
        // Set the locale in cookies
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
        // Reload the page to apply the new locale
        window.location.reload();
    };

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Language Picker"
            priority={false}
            title="Loading Language Picker"
        />
    )

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly className="header-button">
                    <LanguageIcon className="header-icon" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Language Selector"
                selectedKeys={[currentLocale]} // Highlight current locale
                onAction={(key) => setLocale(key as string)} // Set locale and reload
            >
                <DropdownItem key="en">🇺🇸 English</DropdownItem>
                <DropdownItem key="fr">🇫🇷 Français</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
