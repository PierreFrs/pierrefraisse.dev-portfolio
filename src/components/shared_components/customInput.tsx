'use client';

import { Input } from "@nextui-org/input";
import React from "react";
import {FieldError, UseFormRegister} from "react-hook-form";

type CustomInputProps<TFieldName extends string> = {
    field: TFieldName;
    label: string;
    type: string;
    placeholder?: string;
    isRequired?: boolean;
    error?: FieldError | undefined;
    register: UseFormRegister<any>;
    validationRules?: object; // Additional validation rules
};

export const CustomInput = <TFieldName extends string>({
    field,
    label,
    type,
    placeholder,
    isRequired = false,
    error,
    register,
    validationRules = {},
}: CustomInputProps<TFieldName>) => {
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
