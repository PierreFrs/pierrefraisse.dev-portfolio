import { CardModel } from "@/app/lib/models/cardModel";
import Image from "next/image";

type ProjectPictureProps = {
    size?: number;
    project: CardModel;
};

export function ProjectPictureComponent({ size, project }: Readonly<ProjectPictureProps>) {
    const placeholderImageUrl = "/images/placeholder.png";

    // Validate project.link
    const projectLink = project.link && project.link.trim() !== "" ? project.link : null;

    const imageComponent = (
        <Image
            src={project.pictureUrl || placeholderImageUrl}
            alt={project.title || "Project"}
            height={size}
            width={size}
            style={{ width: size ? "auto" : "auto", height: size ? `${size}px` : "auto" }}
            className="rounded"
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
