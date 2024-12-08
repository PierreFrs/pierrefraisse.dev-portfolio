import { Textarea } from "@nextui-org/input";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { ContactFormData } from "@/components/main_components/contact";

type CustomTextareaProps = {
    field: keyof ContactFormData;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    error?: FieldError | undefined;
    register: UseFormRegister<ContactFormData>;
    validationRules?: object;
    rows?: number;
};

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
                                                                  field,
                                                                  label,
                                                                  placeholder,
                                                                  isRequired = false,
                                                                  error,
                                                                  register,
                                                                  validationRules = {},
                                                                  rows = 4,
                                                              }) => {
    return (
        <Textarea
            label={label}
            placeholder={placeholder}
            isRequired={isRequired}
            rows={rows}
            size="sm"
            variant="underlined"
            labelPlacement="inside"
            color={error ? "danger" : "default"}
            errorMessage={error?.message}
            {...register(field, { required: isRequired ? `${label} requis` : false, ...validationRules })}
        />
    );
};
