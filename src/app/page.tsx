import Header from "@/components/main_components/header";
import Footer from "@/components/main_components/footer";
import React from "react";
import MainComponentsComponent from "@/components/main_components/mainComponents";

export default async function Home() {
    return(
        <>
            <Header />
                <main>
                    <MainComponentsComponent />
                </main>
            <Footer />
        </>
    );
}
