import HeroDescription from "@/app/ui/components/hero_components/heroDescription";
import SocialLink from "@/app/ui/components/hero_components/socialLink";
import HeroPicture from "@/app/ui/components/hero_components/heroPicture";

export default async function Hero() {
    return (
        <section className="w-full h-screen flex justify-center items-center bg-hero">
            <div>
                <h1 className="text-6xl font-bold">About me :</h1>
                <div className="flex">
                    <div>
                        <HeroDescription />
                        <div>
                            <SocialLink 
                                href=""
                                network="GitHub"
                                icon=""
                                className=""                                
                            />
                            <SocialLink
                                href=""
                                network="LinkedIn"
                                icon=""
                                className=""
                            />
                        </div>
                    </div>
                    <div>
                        <HeroPicture />
                    </div>
                </div>
            </div>
        </section>
    );
}