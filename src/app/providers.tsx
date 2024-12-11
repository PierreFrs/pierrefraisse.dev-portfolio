'use client';

import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import React from "react";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
    return (
        <SessionProvider>
            <NextUIProvider>
                    {children}
            </NextUIProvider>
        </SessionProvider>
    );    
}