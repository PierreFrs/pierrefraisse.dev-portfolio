import Header from "@/app/ui/components/main_components/header";  
import Footer from "@/app/ui/components/main_components/footer";
import Hero from "@/app/ui/components/main_components/hero";
import ProjectsGallery from "@/app/ui/components/main_components/projectsGallery";
import Contact from "@/app/ui/components/main_components/contact";
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
