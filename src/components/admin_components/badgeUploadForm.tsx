"use client";

import React, {useRef, useState} from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {StackBadge} from "@/app/lib/models/stackBadgeModel";
import {useServices} from "@/contexts/ServiceContext";

interface BadgeUploadFormProps {
    onBadgeAdded: (newBadge: StackBadge) => void;
}

export default function BadgeUploadForm({onBadgeAdded}: Readonly<BadgeUploadFormProps>) {
    const { badgeService} = useServices();
    const [badgeName, setBadgeName] = useState("");
    const [badgeIcon, setBadgeIcon] = useState<File | null>(null);
    const { data: session } = useSession();
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInProgress(true);
        
        if (!badgeIcon) {
            console.error("No badge icon selected");
            return;
        } 
        
        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            return;
        }

        const formData = new FormData();
        formData.append("name", badgeName);
        formData.append("icon", badgeIcon as Blob);
        formData.append("userId", userId);
        
        try {
            const newBadge: StackBadge = await badgeService.addBadge(formData);
            console.log("Badge uploaded successfully");
            onBadgeAdded(newBadge);
            console.log("Badge added to gallery");
            resetForm();
        } catch (error) {
            console.error("Error uploading badge", error);
        } finally {
            setInProgress(false);
        }
    };

    const resetForm = () => {
        setBadgeName("");
        setBadgeIcon(null);
        setFileInputKey(fileInputKey + 1);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-96">
            <div className="mb-4 flex justify-between">
                <label htmlFor="name">Badge Name</label>
                <input
                    id="name"
                    type="text"
                    value={badgeName}
                    onChange={(e) => setBadgeName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label htmlFor="icon">Icon</label>
                <CustomFileInput
                    ref={fileInputRef}
                    key={fileInputKey}
                    onFileChange={(file) => setBadgeIcon(file)}
                    inputKey="badgeUpload" />
            </div>

            <CustomButtonComponent variant="primary" type={"submit"}>{inProgress ? "Uploading..." : "Upload Badge"}</CustomButtonComponent>

        </form>
    );
}
