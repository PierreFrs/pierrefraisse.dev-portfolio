import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StackBadge } from "@/app/lib/models/stackBadgeModel";
import {CardModel} from "@/app/lib/models/cardModel";

export function ProjectsGallery() {
    const [projects, setProjects] = useState<CardModel[]>([]);

    // Fetch projects data from the backend
    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch("/api/projects");
            const data = await response.json();
            setProjects(data);
        }

        fetchProjects();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="border p-4 rounded shadow-lg">
                    <Image
                        src={project.pictureUrl}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="rounded"
                    />
                    <h2 className="text-xl font-bold mt-4">{project.title}</h2>
                    <p className="text-gray-600">{project.shortDescription}</p>
                    <div className="mt-4">
                        <strong>Stack:</strong>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {project.badgesArray.map((badge: StackBadge) => (
                                <li key={badge.id} className="bg-gray-200 rounded px-2 py-1 text-sm">
                                    <Image
                                        src={badge.imageUrl}
                                        alt={badge.name}
                                        width={30}
                                        height={30}
                                        className="inline-block"
                                    />
                                    <span className="ml-2">{badge.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a
                        href={project.link}
                        className="mt-4 inline-block text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Project
                    </a>
                </div>
            ))}
        </div>
    );
}
