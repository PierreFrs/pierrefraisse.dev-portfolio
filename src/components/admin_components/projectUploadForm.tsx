"use client";

import React, {useState, useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import {CardModel} from "@/app/lib/models/cardModel";
import {useServices} from "@/contexts/ServiceContext";

type ProjectUploadFormProps = {
    onProjectAdded: (newProject: CardModel) => void;
};

export default function ProjectUploadForm({ onProjectAdded }: Readonly<ProjectUploadFormProps>) {
    const { badgeService, projectService } = useServices();
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [link, setLink] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const {data: session} = useSession();
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBadges();
    }, []);

    const loadBadges = async () => {
        try {
            const fetchedBadges = await badgeService.fetchBadges();
            setBadges(fetchedBadges);
        } catch (error: any) {
            setError("Failed to load badges. Please try again.");
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInProgress(true);

        if (!title || !shortDescription || !link || !picture || !selectedBadges.length) {
            console.error("Missing required fields");
            setInProgress(false);
            return;
        }

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            setInProgress(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("link", link);
        formData.append("picture", picture as Blob);
        formData.append("stack", JSON.stringify(selectedBadges));
        formData.append("userId", userId);

        try {
            const newProject: CardModel = await projectService.addProject(formData);
            console.log("Project uploaded successfully");
            onProjectAdded(newProject);
            console.log("Project added to gallery");
            resetForm();
        } catch (error) {
            console.error("Error uploading project", error);
        } finally {
            setInProgress(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setShortDescription("");
        setLink("");
        setPicture(null);
        setSelectedBadges([]);
        setFileInputKey((prevKey) => prevKey + 1);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const toggleBadgeSelection = (badgeId: string) => {
        setSelectedBadges((prevSelected) =>
            prevSelected.includes(badgeId)
                ? prevSelected.filter((id) => id !== badgeId)
                : [...prevSelected, badgeId]
        );
    };

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="w-96">
                <div className="mb-4 flex justify-between">
                    <label htmlFor="title">Project Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 flex justify-between">
                    <label htmlFor="shortDescription">Short Description</label>
                    <textarea
                        id="shortDescription"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-4 flex justify-between">
                    <label htmlFor="link">Project Link</label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 flex justify-between">
                    <label htmlFor="picture">Picture</label>
                    <CustomFileInput
                        ref={fileInputRef}
                        key={fileInputKey}
                        onFileChange={(file) => setPicture(file)}
                        inputKey="projectUpload" />
                </div>

                <div className="mb-4 flex flex-col justify-between">
                    <label htmlFor="stack">Select Badges</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {badges.map((badge) => (
                            <div
                                key={badge.id}
                                onClick={() => toggleBadgeSelection(badge.id)}
                                className={`cursor-pointer border-2 rounded p-1 w-20 ${
                                    selectedBadges.includes(badge.id) ? "border-blue-500" : "border-transparent"
                                }`}
                            >
                                <StackBadgeComponent badge={badge} size={30}/>
                            </div>
                        ))}
                    </div>
                </div>

                {inProgress ? (
                    <div className="text-center mb-4">Uploading...</div>
                ) : (
                    <CustomButtonComponent variant="primary" type="submit">
                        Upload Project
                    </CustomButtonComponent>
                )}
            </form>
        </>
    );
}
