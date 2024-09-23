"use client";

import { useState, useEffect } from "react";

export default function ProjectUploadForm() {
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [link, setLink] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [badges, setBadges] = useState<any[]>([]);

    // Fetch available badges
    useEffect(() => {
        async function fetchBadges() {
            const response = await fetch("/api/badges"); // Fetch the badges from API
            const data = await response.json();
            setBadges(data);
        }

        fetchBadges();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("shortDescription", shortDescription);
        formData.append("link", link);
        formData.append("picture", picture as Blob); // Append picture file
        formData.append("badges", JSON.stringify(selectedBadges));

        // Send the form data to the API
        const response = await fetch("/api/projects", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            console.log("Project uploaded successfully");
        } else {
            console.error("Error uploading project");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="shortDescription">Short Description</label>
                <textarea
                    id="shortDescription"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    required
                ></textarea>
            </div>

            <div>
                <label htmlFor="link">Project Link</label>
                <input
                    id="link"
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="picture">Upload Picture</label>
                <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files?.[0] || null)}
                    required
                />
            </div>

            <div>
                <label htmlFor="badges">Select Badges</label>
                <select
                    id="badges"
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

            <button type="submit">Upload Project</button>
        </form>
    );
}
