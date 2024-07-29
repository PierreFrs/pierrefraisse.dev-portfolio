"use client";

import { useState } from "react";
import { postHeroDescription } from "@/app/lib/data/heroDescriptionData";

export default function HeroDescriptionForm() {
    const [description, setDescription] = useState<string>("");
    const [language, setLanguage] = useState<string>("en");
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("description", description);
        formData.append("language", language);
        // If you have a userId, append it here as well
        // formData.append("userId", "your-user-id");

        try {
            const result = await postHeroDescription(formData);

            if ('errors' in result) {
                setMessage(`Failed to update description: ${result.message}`);
            } else {
                setMessage("Description updated successfully!");
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`An error occurred: ${error.message}`);
            } else {
                setMessage("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="language-select">Language:</label>
                <select 
                    id="language-select"
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            </div>
            <div>
                <label htmlFor="description-area">Description:</label>
                <textarea
                    id="description-area"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Description"}
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
    );
}
