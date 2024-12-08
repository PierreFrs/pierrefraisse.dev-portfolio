'use client';

import { Input } from "@nextui-org/input";
import React from "react";
import {FieldError, UseFormRegister} from "react-hook-form";
import {ContactFormData} from "@/components/main_components/contact";

type CustomInputProps = {
    field: keyof ContactFormData;
    label: string;
    type: string;
    placeholder?: string;
    isRequired?: boolean;
    error?: FieldError | undefined;
    register: UseFormRegister<ContactFormData>;
    validationRules?: object; // Additional validation rules
};

export const CustomInput: React.FC<CustomInputProps> = ({
                                                            field,
                                                            label,
                                                            type,
                                                            placeholder,
                                                            isRequired = false,
                                                            error,
                                                            register,
                                                            validationRules = {},
                                                        }) => {
    return (
        <Input
            label={label}
            type={type}
            placeholder={placeholder}
            isRequired={isRequired}
            size="sm"
            variant="underlined"
            labelPlacement="inside"
            color={error ? "danger" : "default"}
            errorMessage={error?.message}
            {...register(field, { required: isRequired ? `${label} requis` : false, ...validationRules })}
        />
    );
};
