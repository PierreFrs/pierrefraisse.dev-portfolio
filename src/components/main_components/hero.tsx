import { FaGithub, FaLinkedin } from "react-icons/fa";
import HeroDescription from "@/components/hero_components/heroDescription";
import SocialLink from "@/components/hero_components/socialLink";
import HeroPicture from "@/components/hero_components/heroPicture";

export default function Hero() {
    return (
        <section id="about" className="homepage-section hero-section">
            <h1 className="hero-title title">Concepteur, développeur d'applications web</h1>
            <div className="flex gap-48">
                <HeroDescription/>
                <HeroPicture size={380}/>
            </div>
            <div className="flex space-x-4 mt-4 gap-16">
                <SocialLink
                    href="https://github.com/your-profile"
                    network="GitHub"
                    icon={<FaGithub/>}
                />
                <SocialLink
                    href="https://linkedin.com/in/your-profile"
                    network="LinkedIn"
                    icon={<FaLinkedin/>}
                />
            </div>
        </section>
    );
}

