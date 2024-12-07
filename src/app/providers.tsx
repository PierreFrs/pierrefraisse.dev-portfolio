'use client';

import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import {ServiceProvider} from "@/contexts/ServiceContext";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <ServiceProvider>
                    {children}
                </ServiceProvider>
            </NextUIProvider>
        </SessionProvider>
    );    
}