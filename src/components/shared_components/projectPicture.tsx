import { CardModel } from "@/app/lib/models/cardModel";
import Image from "next/image";

type ProjectPictureProps = {
    project: CardModel;
};

export function ProjectPictureComponent({ project }: Readonly<ProjectPictureProps>) {
    const placeholderImageUrl = "/images/placeholder.png";

    // Validate project.link
    const projectLink = project.link && project.link.trim() !== "" ? project.link : null;

    const imageComponent = (
        <Image
            src={project.pictureUrl || placeholderImageUrl}
            alt={project.title || "Project"}
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
