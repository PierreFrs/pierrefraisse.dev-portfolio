'use client';

import { useLocale } from 'next-intl';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { LanguageIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';

export const LanguagePicker = () => {
    const currentLocale = useLocale(); // Get the current locale

    const setLocale = (locale: string) => {
        // Set the locale in cookies
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
        // Reload the page to apply the new locale
        window.location.reload();
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly>
                    <LanguageIcon className="w-6 h-6" />
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
