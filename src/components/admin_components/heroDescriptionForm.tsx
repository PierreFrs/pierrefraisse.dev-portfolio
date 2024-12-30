"use client";

import React, {useState } from "react";
import { postHeroDescription } from "@/app/lib/data/heroDescriptionActions";
import {Form} from "@nextui-org/form";
import {useSession} from "next-auth/react";
import {Select, SelectItem} from "@nextui-org/select";
import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

type LanguageItem = {
    value: string;
    fullName: string;
};

export default function HeroDescriptionForm() {
    const { data: session } = useSession();
    const [language, setLanguage] = useState<string>("en");
    const [inProgress, setInProgress] = useState(false);

    const selectValues: LanguageItem[] = [
        { value: "en", fullName: "English" },
        { value: "fr", fullName: "French" }
    ];

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInProgress(true);

        try {
            const formElement = e.currentTarget as HTMLFormElement;

            const formData = new FormData(e.currentTarget);

            const userId = session?.user?.id;
            if (!userId) {
                console.error("No user ID found in session");
                setInProgress(false);
                return;
            }

            const data = {
                userId,
                language,
                text: formData.get("description") as string, // Map `description` to `text`
            };
            const newDescription = await postHeroDescription(data);

            if (!newDescription) {
                console.error("Error uploading description");
                setInProgress(false);
                return null;
            }

            formElement.reset();
            setLanguage("en");
        } catch (err: any) {
            console.error("Error updating description", err);
        } finally {
            setInProgress(false);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="sm"
                color="default"
                defaultSelectedKeys={["en"]}
                className="w-32"
            >
                {selectValues.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.fullName}
                    </SelectItem>
                ))}
            </Select>
            <Textarea
                isRequired
                label="Description"
                placeholder="Enter a description"
                name="description"
                type="text"
                isDisabled={inProgress}
                variant="bordered"
            />
            <Button
                type="submit"
                isLoading={inProgress}
            >
                Upload
            </Button>
        </Form>
    );
}
