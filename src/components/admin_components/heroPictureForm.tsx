"use client";

import {useState} from "react";
import Image from "next/image";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";

export default function HeroPictureForm({userId} : Readonly<{ userId: string }>) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        setInProgress(true);
        e.preventDefault();

        if (!file) {
            console.error("No file selected");
            setInProgress(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("userId", userId);

        try {
            const response = await fetch("/api/heroPicture", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Hero picture uploaded successfully");
            } else {
                console.error("Error uploading hero picture");
            }
            setInProgress(false);
        } catch (error) {
            console.error("Error uploading hero picture", error);
            setInProgress(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <CustomFileInput onFileChange={(file) => {
                setFile(file);
                    if (file) {
                        setPreview(URL.createObjectURL(file));
                    } else {
                        setPreview(null);
                    }
                }
            }
            />
            <input type="hidden" value={userId} name="userId"/>
            <CustomButtonComponent variant="primary" type="submit">
                {inProgress ? "Uploading..." : "Upload"}
            </CustomButtonComponent>
            
            {preview && 
                <Image src={preview} 
                       alt="Preview"
                       width={200}
                       height={200}
                       className="mt-4"
                />
            }
        </form>
    );
}