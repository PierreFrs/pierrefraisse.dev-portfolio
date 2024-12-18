import React, {useState, useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadgeComponent} from "@/components/shared_components/stackBadge";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";
import {CustomInput} from "@/components/shared_components/customInput";
import {CustomTextarea} from "@/components/shared_components/customTextArea";
import {fetchBadges} from "@/app/lib/data/badgeActions";
import {addProject} from "@/app/lib/data/projectActions";
import {CardModelWithBadges} from "@/app/lib/models/cardModelWithBadges";

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
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ProjectFormSchema>();
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
                <CustomInput
                    field="titleEn"
                    label="Project Title (En)"
                    type="text"
                    placeholder="Enter project title in english"
                    isRequired
                    error={errors.titleEn}
                    register={register}
                />
                <CustomInput
                    field="titleFr"
                    label="Project Title (Fr)"
                    type="text"
                    placeholder="Enter project title in french"
                    isRequired
                    error={errors.titleFr}
                    register={register}
                />
                <CustomTextarea
                    field="shortDescriptionEn"
                    label="Short Description (en)"
                    placeholder="Enter a short description in english"
                    isRequired
                    error={errors.shortDescriptionEn}
                    register={register}
                />
                <CustomTextarea
                    field="shortDescriptionFr"
                    label="Short Description (fr)"
                    placeholder="Enter a short description in french"
                    isRequired
                    error={errors.shortDescriptionFr}
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
