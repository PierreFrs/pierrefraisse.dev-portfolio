import {ProjectPictureComponent} from "@/components/shared_components/projectPicture";
import {ProjectStackGallery} from "@/components/shared_components/projectStackGallery";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import {useTranslations} from "next-intl";

type MainProjectCardComponentProps = {
    project: CardModelWithBadges;
};

export function MainProjectCardComponent({ project }: Readonly<MainProjectCardComponentProps>) {
    const t = useTranslations('HomePage.project-card');
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
                    <Button
                        as={Link}
                        href={project.link}
                        target={"_blank"}
                    >
                        {t('visit-button')}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}