import { FaGithub, FaLinkedin } from "react-icons/fa";
import HeroDescription from "@/components/hero_components/heroDescription";
import SocialLink from "@/components/hero_components/socialLink";
import HeroPicture from "@/components/hero_components/heroPicture";

export default function Hero() {
    return (
        <section className="w-full h-screen flex justify-center items-center bg-hero">
            <div className="text-center">
                <div className="flex justify-between items-center">
                    <div className="mr-8">
                        <h1 className="text-6xl font-bold mb-8">About me :</h1>
                        <HeroDescription/>
                        <div className="flex space-x-4 mt-4">
                            <SocialLink
                                href="https://github.com/your-profile"
                                network="GitHub"
                                icon={<FaGithub/>}
                                className="text-gray-800 hover:text-gray-600"
                            />
                            <SocialLink
                                href="https://linkedin.com/in/your-profile"
                                network="LinkedIn"
                                icon={<FaLinkedin/>}
                                className="text-blue-700 hover:text-blue-500"
                            />
                        </div>
                    </div>
                    <HeroPicture size={420}/>
                </div>
            </div>
        </section>
    );
}

