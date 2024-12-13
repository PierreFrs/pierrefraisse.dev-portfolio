'use client';

import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import React from "react";
import {ThemeProvider} from "next-themes";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </SessionProvider>
);
}