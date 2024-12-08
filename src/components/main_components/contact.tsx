'use client';

import { useForm } from 'react-hook-form';
import { sendEmail } from "@/app/utils/send-email";
import React from "react";
import {CustomButtonComponent} from "@/components/shared_components/CustomButton";

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

    const onSubmit = async (data: ContactFormData) => {
        setInProgress(true);
        setSuccess(false);
        setError(null);
        try {
            const message = await sendEmail(data); // Simulate sending the email
            console.log(message);
            setSuccess(true); // Show success message
            reset(); // Reset the form
        } catch (err: any) {
            console.error("Failed to send email", error);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setInProgress(false);
        }
    };

    return (
        <section id="contact" className="homepage-section max-w-96">
            <h2 className="text-3xl section-title">Contact</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-5'>
                    <label
                        htmlFor='name'
                        className='mb-3 block text-base font-medium'
                    >
                        Votre nom
                    </label>
                    <input
                        type='text'
                        placeholder='Prénom Nom'
                        className={`w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-bg-primary-50 focus:shadow-md ${errors.name ? 'border-red-500' : 'border-foreground-rgb'}`}
                        {...register('name', {required: "Nom requis"})}
                    />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='email'
                        className='mb-3 block text-base font-medium'
                    >
                        Adresse Mail
                    </label>
                    <input
                        type='email'
                        placeholder='example@domain.com'
                        className={`w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:bordbg-primary-50 focus:shadow-md ${errors.name ? 'border-red-500' : 'border-foreground-rgb'}`}
                        {...register('email', {
                            required: "Adresse mail requise",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Adresse mail invalide"
                            },
                        })}
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor='subject'
                        className='mb-3 block text-base font-medium'
                    >
                        Objet
                    </label>
                    <input
                        type='text'
                        placeholder='Objet'
                        className={`w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:bordbg-primary-50 focus:shadow-md ${errors.name ? 'border-red-500' : 'border-foreground-rgb'}`}
                        {...register('subject', {required: "Objet requis"})}
                    />
                    {errors.subject && <p className='text-red-500'>{errors.subject.message}</p>}
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='message'
                        className='mb-3 block text-base font-medium'
                    >
                        Message
                    </label>
                    <textarea
                        rows={4}
                        placeholder='Votre message'
                        className={`w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:bordbg-primary-50 focus:shadow-md ${errors.name ? 'border-red-500' : 'border-foreground-rgb'}`}
                        {...register('message', {required: "Message requis"})}
                    ></textarea>
                    {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
                </div>
                <div className="flex items-center gap-4">
                    <CustomButtonComponent variant={"primary"}
                                           type={"submit"}>{inProgress ? "Envoi..." : "Envoyer"}</CustomButtonComponent>
                    {success && <p className="text-green-500">Message envoyé avec succès !</p>}
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </form>
        </section>
    );
};