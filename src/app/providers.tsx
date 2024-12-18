'use client';

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
    children: React.ReactNode;
    messages: Record<string, any>;
    locale: string;
    timeZone: string;
}

export default function Providers({children, messages, locale, timeZone }: Readonly<ProvidersProps>) {
    return (
        <NextIntlClientProvider
            messages={messages}
            locale={locale}
            timeZone={timeZone}
        >
            <SessionProvider>
                <NextUIProvider>
                    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </SessionProvider>
        </NextIntlClientProvider>
    );
}
