import React, {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {Form} from "@nextui-org/form";
import {addBadge} from "@/app/lib/data/badgeActions";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

interface BadgeUploadFormProps {
    onBadgeAdded: (newBadge: StackBadge) => void;
}

export default function BadgeUploadForm({onBadgeAdded}: Readonly<BadgeUploadFormProps>) {
    const { data: session } = useSession();
    const [badgeIcon, setBadgeIcon] = useState<File | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);

    const resetForm = () => {
        setBadgeIcon(null);
        setFileInputKey(fileInputKey + 1);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInProgress(true);

        if (!badgeIcon) {
            console.error("No badge icon selected");
            setInProgress(false);
            return;
        }

        try {
            const formData = new FormData(e.currentTarget);

            const userId = session?.user?.id;
            if (!userId) {
                console.error("User ID is missing");
                setInProgress(false);
                return;
            }

            formData.set("name", formData.get("badgeName") as string);
            formData.set("userId", userId);
            formData.set("icon", badgeIcon);

            const newBadge = await addBadge(formData);

            if (!newBadge) {
                console.error("Error uploading badge:");
                setInProgress(false);
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

    return (
        <Form onSubmit={onSubmit} className="w-96">
            <Input
                isRequired
                label="Badge Name"
                placeholder="Enter badge name"
                name="badgeName"
                type="text"
                variant="bordered"
            />
            <CustomFileInput
                ref={fileInputRef}
                key={fileInputKey}
                onFileChange={(file) => setBadgeIcon(file)}
                inputKey="badgeUpload"
            />
            <Button
                color="primary"
                type="submit"
                isLoading={inProgress}
            >
                Upload
            </Button>
        </Form>
    );
}
