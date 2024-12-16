'use client';

import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import React from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
);
}