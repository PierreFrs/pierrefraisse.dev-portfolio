import { CardModel } from "@/app/lib/models/cardModel";
import Image from "next/image";
import {useLocale} from "next-intl";

type ProjectPictureProps = {
    project: CardModel;
};

export function ProjectPictureComponent({ project }: Readonly<ProjectPictureProps>) {
    const placeholderImageUrl = "/images/placeholder.png";
    const locale = useLocale();

    // Find the translation for the current locale
    const translation = project.translations.find(
        (trans) => trans.language === locale
    );

    const title = translation?.title || "Title not available";

    // Validate project.link
    const projectLink = project.link && project.link.trim() !== "" ? project.link : null;


    const imageComponent = (
        <Image
            src={project.pictureUrl || placeholderImageUrl}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            style={{width: '100%', height: 'auto'}}
            priority={true}
        />
    );

    return projectLink ? (
        <a href={projectLink} target="_blank" rel="noopener noreferrer" className="block">
            {imageComponent}
        </a>
    ) : (
        imageComponent
    );
}
