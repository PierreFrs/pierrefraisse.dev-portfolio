import React, {useState, useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";
import {fetchBadges} from "@/app/lib/data/badgeActions";
import {addProject} from "@/app/lib/data/projectActions";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

interface ProjectUploadFormProps {
    onProjectAdded: (newProject: CardModelWithBadges) => void;
}

type ProjectFormSchema = {
    titleEn: string;
    titleFr: string;
    shortDescriptionEn: string;
    shortDescriptionFr: string;
    link?: string;
};

export default function ProjectUploadForm({ onProjectAdded }: Readonly<ProjectUploadFormProps>) {
    const {data: session} = useSession();
    const {register, handleSubmit, reset} = useForm<ProjectFormSchema>();
    const [picture, setPicture] = useState<File | null>(null);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const fetchedBadges = await fetchBadges();
            setBadges(fetchedBadges);
        })();
    }, []);

    const onSubmit = async (data: ProjectFormSchema) => {
        setInProgress(true);

        if (!picture) {
            console.error("Picture is required.");
            setInProgress(false);
            return;
        }

            const formData = new FormData();
            formData.append("titleEn", data.titleEn);
            formData.append("titleFr", data.titleFr);
            formData.append("shortDescriptionEn", data.shortDescriptionEn);
            formData.append("shortDescriptionFr", data.shortDescriptionFr);
            formData.append("link", data.link ?? "");
            formData.append("picture", picture as Blob);
            selectedBadges.forEach((badgeId) => formData.append("stack", badgeId));

            const userId = session?.user?.id;
            if (!userId) {
                console.error("User ID is missing");
                return setError("User ID is missing");
            }
            formData.append("userId", userId);

            try {
                const newProject = await addProject(formData);
                onProjectAdded(newProject);
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
                <Input
                    {...register("titleEn", { required: true })}
                    label="Project Title (En)"
                    placeholder="Enter project title in English"
                    type="text"
                    variant="bordered"
                />
                <Input
                    {...register("titleFr", { required: true })}
                    label="Project Title (Fr)"
                    placeholder="Enter project title in French"
                    type="text"
                    variant="bordered"
                />
                <Textarea
                    {...register("shortDescriptionEn", { required: true })}
                    label="Short Description (En)"
                    placeholder="Enter a short description in English"
                    type="text"
                    variant="bordered"
                />
                <Textarea
                    {...register("shortDescriptionFr", { required: true })}
                    label="Short Description (Fr)"
                    placeholder="Enter a short description in French"
                    type="text"
                    variant="bordered"
                />
                <Input
                    {...register("link")}
                    label="Project Link"
                    placeholder="Enter project link"
                    type="url"
                    variant="bordered"
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
                                type="button"
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
                <Button
                    type="submit"
                    isLoading={inProgress}
                >
                    Upload
                </Button>
            </Form>
        </>
    );
}
