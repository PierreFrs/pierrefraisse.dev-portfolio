'use client';

import { Form } from "@nextui-org/form";
import {useForm} from 'react-hook-form';
import { sendEmail } from "@/app/utils/send-email";
import React, {useEffect} from "react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";
import {CustomInput} from "@/components/shared_components/customInput";
import {CustomTextarea} from "@/components/shared_components/customTextArea";
import {useTranslations} from "next-intl";

export type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>();
    const [inProgress, setInProgress] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const t = useTranslations('HomePage.contact-section');

    const onSubmit = async (data: ContactFormData) => {
        setInProgress(true);
        setSuccess(false);
        setError(null);
        try {
            const message = await sendEmail(data);
            console.log(message);
            setSuccess(true);
            reset();
        } catch (err: any) {
            console.error("Failed to send email", error);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setInProgress(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
        }
    }, [success]);

    return (
        <section id="contact" className="homepage-section contact-section">
            <h2 className="title section-title">Contact</h2>
            <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="contact-fields-container">
                    <CustomInput
                        field="name"
                        label={t('name')}
                        type="text"
                        placeholder={t('name-placeholder')}
                        isRequired
                        error={errors.name}
                        register={register}
                    />
                    <CustomInput
                        field="email"
                        label={t('email')}
                        type="email"
                        placeholder={t('email-placeholder')}
                        isRequired
                        error={errors.email}
                        register={register}
                        validationRules={{
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: t('email-error-message'),
                            },
                        }}
                    />
                    <CustomInput
                        field="subject"
                        label={t('subject')}
                        type="text"
                        placeholder={t('subject-placeholder')}
                        isRequired
                        error={errors.subject}
                        register={register}
                    />
                    <CustomTextarea
                        field="message"
                        label={t('message')}
                        placeholder={t('message-placeholder')}
                        isRequired
                        error={errors.message}
                        register={register}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <CustomButtonComponent
                        variant="primary"
                        type={"submit"}
                        isLoading={inProgress}
                    >
                        Envoyer
                    </CustomButtonComponent>
                    {success && <p className="text-xs">Message envoyé</p>}
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </Form>
        </section>
    );
};