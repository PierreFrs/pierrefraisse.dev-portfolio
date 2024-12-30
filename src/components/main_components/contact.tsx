'use client';

import { Form } from "@nextui-org/form";
import { sendEmail } from "@/app/utils/send-email";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export default function Contact() {
    const [inProgress, setInProgress] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [formKey, setFormKey] = useState(0);

    const t = useTranslations('HomePage.contact-section');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInProgress(true);
        setSuccess(false);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            await sendEmail(data);
            setSuccess(true);
            setFormKey((prevKey) => prevKey + 1);
        } catch (err: any) {
            setError(err.message || t("unexpected-error"));
        } finally {
            setInProgress(false);
        }
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const validateEmail = (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    return (
        <section id="contact" className="homepage-section contact-section">
            <h2 className="title section-title">Contact</h2>
            <Form
                key={formKey}
                onSubmit={onSubmit}
                className="contact-form"
                validationBehavior="native"
            >
                <div className="contact-fields-container">
                    <Input
                        isRequired
                        label={t("name")}
                        placeholder={t("name-placeholder")}
                        name="name"
                        type="text"
                        validate={(value) => {
                            if (!value) {
                                return t("name-error-message");
                            }
                            return true;
                        }}
                        isDisabled={inProgress}
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        label={t("email")}
                        placeholder={t("email-placeholder")}
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!value) {
                                return t("required-email-message");
                            }
                            if (!validateEmail(value)) {
                                return t("invalid-email-message");
                            }
                            return true;
                        }}
                        isDisabled={inProgress}
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        label={t("subject")}
                        placeholder={t("subject-placeholder")}
                        name="subject"
                        type="text"
                        validate={(value) => {
                            if (!value) {
                                return t("subject-error-message");
                            }
                            return true;
                        }}
                        isDisabled={inProgress}
                        variant="bordered"
                    />
                    <Textarea
                        isRequired
                        label={t("message")}
                        placeholder={t("message-placeholder")}
                        name="message"
                        type="text"
                        rows={4}
                        validate={(value) => {
                            if (!value) {
                                return t("message-error-message");
                            }
                            return true;
                        }}
                        isDisabled={inProgress}
                        variant="bordered"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        isLoading={inProgress}
                    >
                        {t("send-contact-message")}
                    </Button>
                    {success && <p className="text-xs">{t('contact-message-sent')}</p>}
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </Form>
        </section>
    );
};