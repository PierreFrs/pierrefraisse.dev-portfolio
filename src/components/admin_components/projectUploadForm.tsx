"use client";

import React, {useState, useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import {CardModel} from "@/app/lib/models/cardModel";
import {useServices} from "@/contexts/ServiceContext";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";
import {CustomInput} from "@/components/shared_components/customInput";
import {CustomTextarea} from "@/components/shared_components/customTextArea";

interface ProjectUploadFormProps {
    onProjectAdded: (newProject: CardModel) => void;
}

type ProjectFormSchema = {
    title: string;
    shortDescription: string;
    link?: string;
};

export default function ProjectUploadForm({ onProjectAdded }: Readonly<ProjectUploadFormProps>) {
    const { badgeService, projectService } = useServices();
    const {data: session} = useSession();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ProjectFormSchema>();
    const [picture, setPicture] = useState<File | null>(null);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
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

    const onSubmit = async (data: ProjectFormSchema) => {
        setInProgress(true);

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            setInProgress(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("shortDescription", data.shortDescription);
        formData.append("link", data.link ?? "");
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
        reset();
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

            <Form onSubmit={handleSubmit(onSubmit)} className="w-96">
                <CustomInput
                    field="title"
                    label="Project Title"
                    type="text"
                    placeholder="Enter project title"
                    isRequired
                    error={errors.title}
                    register={register}
                />
                <CustomTextarea
                    field="shortDescription"
                    label="Short Description"
                    placeholder="Enter a short description"
                    isRequired
                    error={errors.shortDescription}
                    register={register}
                />
                <CustomInput
                    field="link"
                    label="Project Link"
                    type="url"
                    placeholder="Enter project link"
                    register={register}
                />

                <div className="mb-4 mt-2 w-full flex justify-between items-center">
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
                            <button
                                key={badge.id}
                                onClick={() => toggleBadgeSelection(badge.id)}
                                className={`cursor-pointer border-2 rounded p-1 w-20 ${
                                    selectedBadges.includes(badge.id) ? "border-blue-500" : "border-transparent"
                                }`}
                            >
                                <StackBadgeComponent badge={badge} size={30}/>
                            </button>
                        ))}
                    </div>
                </div>
                <CustomButtonComponent
                    variant="primary"
                    type="submit"
                    isLoading={inProgress}
                >
                    Upload
                </CustomButtonComponent>
            </Form>
        </>
    );
}
