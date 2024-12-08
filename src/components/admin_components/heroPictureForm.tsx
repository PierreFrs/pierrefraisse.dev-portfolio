"use client";

import {useRef, useState} from "react";
import Image from "next/image";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomFileInput} from "@/components/shared_components/CustomFileInput";
import {useSession} from "next-auth/react";
import {Form} from "@nextui-org/form";
import {useForm} from "react-hook-form";


export type HeroPictureFormData = {
    userId: string;
    file: File;
};

export default function HeroPictureForm() {
    const {handleSubmit, reset} = useForm<HeroPictureFormData>();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const { data: session } = useSession();

    const onSubmit = async () => {
        setInProgress(true);

        if (!file) {
            console.error("No file selected");
            setInProgress(false);
            return;
        }

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            return;
        }

        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("userId", userId);

        try {
            await fetch("/api/heroPicture", {
                method: "POST",
                body: formData,
            });

            resetForm();
        } catch (error) {
            console.error("Error uploading hero picture", error);
        } finally {
            setInProgress(false);
        }
    };

        const resetForm = () => {
            reset();
            setFile(null);
            setFileInputKey(fileInputKey + 1);
            setPreview(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <CustomFileInput
                ref={fileInputRef}
                key={fileInputKey}
                onFileChange={(file) => {
                    setFile(file);
                        if (file) {
                            setPreview(URL.createObjectURL(file));
                        } else {
                            setPreview(null);
                        }
                    }
                }
                inputKey="heroUpload"
            />
            <CustomButtonComponent
                variant="primary"
                type="submit"
                isLoading={inProgress}
            >
                Upload
            </CustomButtonComponent>
            
            {preview && 
                <Image src={preview} 
                       alt="Preview"
                       width={200}
                       height={200}
                       className="mt-4"
                />
            }
        </Form>
    );
}