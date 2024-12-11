import React, {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {CustomInput} from "@/components/shared_components/customInput";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";
import {addBadge} from "@/app/lib/data/badgeActions";

interface BadgeUploadFormProps {
    onBadgeAdded: (newBadge: StackBadge) => void;
}

type BadgeFormSchema = {
    badgeName: string;
};

export default function BadgeUploadForm({onBadgeAdded}: Readonly<BadgeUploadFormProps>) {
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

        try {
            const userId = session?.user?.id;
            if (!userId) {
                console.error("User ID is missing");
                return;
            }

            const formData = new FormData();
            formData.append("name", data.badgeName);
            formData.append("icon", badgeIcon);
            formData.append("userId", userId);

            const newBadge = await addBadge(formData);

            if (newBadge === null) {
                console.error("Error uploading badge:");
                return null;
            }

            onBadgeAdded(newBadge);

            resetForm();
        } catch (error: any) {
            console.error("Error uploading badge:", error);
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
                error={errors.badgeName}
                register={register}
            />
            <CustomFileInput
                ref={fileInputRef}
                key={fileInputKey}
                onFileChange={(file) => setBadgeIcon(file)}
                inputKey="badgeUpload" />
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
