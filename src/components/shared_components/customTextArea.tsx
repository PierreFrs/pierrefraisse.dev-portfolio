import { Textarea } from "@nextui-org/input";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type CustomTextareaProps<TFieldName extends string> = {
    field: TFieldName;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    error?: FieldError;
    register: UseFormRegister<any>;
    validationRules?: object;
    rows?: number;
};

export const CustomTextarea = <TFieldName extends string>({
          field,
          label,
          placeholder,
          isRequired = false,
          error,
          register,
          validationRules = {},
          rows = 4,
      }: CustomTextareaProps<TFieldName>) => {
    const color = error ? "danger" : "default";

    return (
        <Textarea
            label={label}
            placeholder={placeholder}
            isRequired={isRequired}
            rows={rows}
            size="sm"
            variant="underlined"
            labelPlacement="inside"
            color={color}
            errorMessage={error?.message}
            {...register(field, { required: isRequired ? `${label} requis` : false, ...validationRules })}
        />
    );
};
