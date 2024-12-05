import { CardModel } from "@/app/lib/models/cardModel";
import Image from "next/image";

type ProjectPictureProps = {
    height: number;
    project: CardModel;
};

export function ProjectPictureComponent({ height, project }: Readonly<ProjectPictureProps>) {
    const placeholderImageUrl = "/images/placeholder.png";

    // Validate project.link
    const projectLink = project.link && project.link.trim() !== "" ? project.link : "#";

    return (
        <a href={projectLink} target="_blank" rel="noopener noreferrer" className="block">
            <div style={{ height, position: "relative", width: "100%" }}>
                <Image
                    src={project.pictureUrl || placeholderImageUrl}
                    alt={project.title || "Project"}
                    layout="fill"
                    objectFit="contain"
                    className="rounded"
                    priority={true}
                />
            </div>
        </a>
    );
}
