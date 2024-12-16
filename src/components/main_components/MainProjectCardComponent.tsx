import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

type MainProjectCardComponentProps = {
    project: CardModelWithBadges;
};

export function MainProjectCardComponent({ project }: Readonly<MainProjectCardComponentProps>) {
    return (
        <Card key={project.id}
              radius="md"
              className="project-card dark:bg-black-100 dark:text-white-100"
        >
            <ProjectPictureComponent project={project}/>
            <CardHeader className="card-title">{project.title}</CardHeader>
            <CardBody>
                <p>
                    {project.shortDescription}
                </p>
                <ProjectStackGallery stack={project.stackBadges}/>
            </CardBody>
            {project.link && (
                <CardFooter>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <CustomButtonComponent variant="primary" >Visiter</CustomButtonComponent>
                    </a>
                </CardFooter>
            )}
        </Card>
    );
}