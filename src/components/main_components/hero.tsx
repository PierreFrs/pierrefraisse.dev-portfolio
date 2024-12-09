import { FaGithub, FaLinkedin } from "react-icons/fa";
import HeroDescription from "@/components/hero_components/heroDescription";
import SocialLink from "@/components/hero_components/socialLink";
import HeroPicture from "@/components/hero_components/heroPicture";

export default function Hero() {
    return (
        <section id="about" className="homepage-section hero-section">
                <div>
                    <h1 className="hero-title title">About me :</h1>
                    <HeroDescription/>
                    <div className="flex space-x-4 mt-4">
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
                </div>
                <HeroPicture size={380}/>
        </section>
    );
}

