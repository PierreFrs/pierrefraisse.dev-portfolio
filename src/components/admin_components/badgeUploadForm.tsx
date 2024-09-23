"use client";

import { useState } from "react";
import {useSession} from "next-auth/react";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Badge Name</label>
                <input
                    id="name"
                    type="text"
                    value={badgeName}
                    onChange={(e) => setBadgeName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="icon">Upload Badge Icon</label>
                <input
                    id="icon"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBadgeIcon(e.target.files?.[0] || null)}
                    required
                />
            </div>

            <button type="submit">
                {inProgress ? "Uploading..." : "Upload Badge"}
            </button>
        </form>
    );
}
