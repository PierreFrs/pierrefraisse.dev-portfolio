"use client";

import { useState, useEffect } from "react";
import {useSession} from "next-auth/react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";

export default function ProjectUploadForm() {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [link, setLink] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const {data: session} = useSession();
    const [inProgress, setInProgress] = useState(false);

    // Fetch available badges
    useEffect(() => {
        async function fetchBadges() {
            const response = await fetch("/api/stackBadges"); // Fetch the badges from API
            const data = await response.json();
            setBadges(data);
        }

        fetchBadges();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInProgress(true);

        if (!title || !shortDescription || !link || !picture || !selectedBadges.length) {
            console.error("Missing required fields");
            return;
        }

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("link", link);
        formData.append("picture", picture as Blob); // Append picture file
        formData.append("stack", JSON.stringify(selectedBadges));
        formData.append("userId", userId);

        try {
            const response = await fetch("/api/projectGallery", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Project uploaded successfully");
            } else {
                console.error("Error uploading project");
            }
            setInProgress(false);
        }
        catch (error) {
            console.error("Error uploading project", error);
            setInProgress(false);
        }
    };

    return (
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
                <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files?.[0] || null)}
                    required
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label htmlFor="stack">Select Badges</label>
                <select
                    className="w-32"
                    id="stack"
                    multiple
                    value={selectedBadges}
                    onChange={(e) =>
                        setSelectedBadges(
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                >
                    {badges.map((badge) => (
                        <option key={badge.id} value={badge.id}>
                            {badge.name}
                        </option>
                    ))}
                </select>
            </div>

            {inProgress ? (
                <div className="text-center mb-4">Uploading...</div>
            ) : (
                <CustomButtonComponent variant="primary" type="submit">
                    Upload Project
                </CustomButtonComponent>
            )}
        </form>
    );
}
