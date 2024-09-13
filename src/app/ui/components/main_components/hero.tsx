import HeroDescription from "@/app/ui/components/hero_components/heroDescription";
import SocialLink from "@/app/ui/components/hero_components/socialLink";
import HeroPicture from "@/app/ui/components/hero_components/heroPicture";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
    return (
        <section className="w-full h-screen flex justify-center items-center bg-hero">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-8">About me :</h1>
                <div className="flex justify-between items-center">
                    <div className="mr-8">
                        <HeroDescription />
                        <div className="flex space-x-4 mt-4">
                            <SocialLink
                                href="https://github.com/your-profile"
                                network="GitHub"
                                icon={<FaGithub />}
                                className="text-gray-800 hover:text-gray-600"
                            />
                            <SocialLink
                                href="https://linkedin.com/in/your-profile"
                                network="LinkedIn"
                                icon={<FaLinkedin />}
                                className="text-blue-700 hover:text-blue-500"
                            />
                        </div>
                    </div>
                    <HeroPicture />
                </div>
            </div>
        </section>
    );
}

