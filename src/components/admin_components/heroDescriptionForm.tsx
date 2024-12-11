"use client";

import React, {useState } from "react";
import { postHeroDescription } from "@/app/lib/data/heroDescriptionActions";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomTextarea} from "@/components/shared_components/customTextArea";
import {useForm} from "react-hook-form";
import {Form} from "@nextui-org/form";
import {useSession} from "next-auth/react";
import {Select, SelectItem} from "@nextui-org/select";

type HeroDescriptionFormSchema = {
    description: string;
};

type LanguageItem = {
    value: string;
    fullName: string;
};

export default function HeroDescriptionForm() {
    const { data: session } = useSession();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<HeroDescriptionFormSchema>();
    const [language, setLanguage] = useState<string>("en");
    const [inProgress, setInProgress] = useState(false);

    const selectValues: LanguageItem[] = [
        { value: "en", fullName: "English" },
        { value: "fr", fullName: "French" }
    ];

    const onSubmit = async (data: HeroDescriptionFormSchema) => {
        setInProgress(true);

        const userId = session?.user?.id;
        if (!userId) {
            console.error("No user ID found in session");
            setInProgress(false);
            return;
        }

        try {
            await postHeroDescription({
                userId,
                language,
                text: data.description
            });
            reset();
        } catch (err: any) {
            console.error("Error updating description", err);
        } finally {
            setInProgress(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <CustomTextarea
                field="description"
                label="Description"
                placeholder="Enter a description"
                isRequired
                error={errors.description}
                register={register}
            />
            <CustomButtonComponent
                variant="primary"
                type="submit"
                isLoading={inProgress}
            >
                Upload
            </CustomButtonComponent>
        </Form>
    );
}
