import Header from "@/components/main_components/header";
import Hero from "@/components/main_components/hero";
import ProjectsGallery from "@/components/main_components/projectsGallery";
import Contact from "@/components/main_components/contact";
import Footer from "@/components/main_components/footer";

export default function Home() {
    return(
        <>
            <Header />
                <main>
                    <Hero />
                    <ProjectsGallery />
                    <Contact />
                </main>
            <Footer />
        </>
    );
}
