"use client";

import React, {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {useServices} from "@/contexts/ServiceContext";
import {CustomInput} from "@/components/shared_components/customInput";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";

interface BadgeUploadFormProps {
    onBadgeAdded: (newBadge: StackBadge) => void;
}

type BadgeFormSchema = {
    badgeName: string;
};

export default function BadgeUploadForm({onBadgeAdded}: Readonly<BadgeUploadFormProps>) {
    const { badgeService} = useServices();
    const { data: session } = useSession();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BadgeFormSchema>();
    const [badgeIcon, setBadgeIcon] = useState<File | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    
    const onSubmit = async (data: BadgeFormSchema) => {
        setInProgress(true);

        if (!badgeIcon) {
            console.error("No badge icon selected");
            setInProgress(false);
            return;
        }

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.badgeName);
        formData.append("icon", badgeIcon as Blob);
        formData.append("userId", userId);
        
        try {
            const newBadge: StackBadge = await badgeService.addBadge(formData);
            console.log("Badge uploaded successfully");
            onBadgeAdded(newBadge);
            resetForm();
        } catch (error) {
            console.error("Error uploading badge", error);
        } finally {
            setInProgress(false);
        }
    };

    const resetForm = () => {
        reset();
        setBadgeIcon(null);
        setFileInputKey(fileInputKey + 1);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="w-96">
            <CustomInput
                field="badgeName"
                label="Badge Name"
                type="text"
                placeholder="Enter badge name"
                isRequired
                error={errors.badgeName} // Replace with validation if needed
                register={register}
            />

            <div className="mb-4 flex justify-between">
                <CustomFileInput
                    ref={fileInputRef}
                    key={fileInputKey}
                    onFileChange={(file) => setBadgeIcon(file)}
                    inputKey="badgeUpload" />
            </div>
            <CustomButtonComponent
                variant="primary"
                type="submit"
                isLoading={inProgress}
            >
                Upload
            </CustomButtonComponent>
        </Form>
    );
}
