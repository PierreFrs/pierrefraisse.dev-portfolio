"use client";

import {useState} from "react";
import Image from "next/image";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";

export default function HeroPictureForm({userId} : Readonly<{ userId: string }>) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        setInProgress(true);
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("userId", userId);
        
        const response = await fetch(`/api/heroPicture`, {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        setPreview(data.url);
        setInProgress(false);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.item(0) || null);
                }}
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
                />
            }
        </form>
    );
}