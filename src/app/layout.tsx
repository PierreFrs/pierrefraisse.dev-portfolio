import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import React from "react";
import getRequestConfig from '@/i18n/request';
import Header from "@/components/main_components/header";
import Footer from "@/components/main_components/footer";


export const metadata: Metadata = {
    title: "Pierre Fraisse Portfolio",
    description: "Professional portfolio of Pierre Fraisse",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const { locale, messages, timeZone } = await getRequestConfig();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased">
                <Providers messages={messages} locale={locale} timeZone={timeZone}>
                    <Header />
                        {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
