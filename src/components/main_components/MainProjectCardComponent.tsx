import {CardModel} from "@/app/lib/models/cardModel";
import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";

type MainProjectCardComponentProps = {
    project: CardModel;
};

export function MainProjectCardComponent({ project }: Readonly<MainProjectCardComponentProps>) {
    return (
        <Card key={project.id} className="project-card">
            <ProjectPictureComponent project={project}/>
            <CardHeader className="card-title">{project.title}</CardHeader>
            <CardBody>
                <p>
                    {project.shortDescription}
                </p>
                <ProjectStackGallery stack={project.stackBadges as StackBadge[]}/>
            </CardBody>
            {project.link && (
                <CardFooter>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <CustomButtonComponent variant="primary">Visiter</CustomButtonComponent>
                    </a>
                </CardFooter>
            )}
        </Card>
    );
}