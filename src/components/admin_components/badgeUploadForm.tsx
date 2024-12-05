"use client";

import React, { useState } from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";

export default function BadgeUploadForm() {
    const [badgeName, setBadgeName] = useState("");
    const [badgeIcon, setBadgeIcon] = useState<File | null>(null);
    const { data: session } = useSession();
    const [inProgress, setInProgress] = useState(false);
    
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
            const response = await fetch("/api/stackBadges", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                console.log("Badge uploaded successfully");
            } else {
                console.error("Error uploading badge");
            }
            setInProgress(false);
        }
        catch (error) {
            console.error("Error uploading badge", error);
            setInProgress(false);
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
                <CustomFileInput onFileChange={(file) => setBadgeIcon(file)} inputKey="badgeUpload" />
            </div>

            <CustomButtonComponent variant="primary" type={"submit"}>{inProgress ? "Uploading..." : "Upload Badge"}</CustomButtonComponent>

        </form>
    );
}
