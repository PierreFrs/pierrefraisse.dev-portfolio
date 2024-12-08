import React from "react";
import {Button} from "@nextui-org/button";

type CustomButtonProps = {
    variant: "primary" | "warning";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    isLoading?: boolean;
    children: React.ReactNode;
};

export function CustomButtonComponent({
      variant,
      type = "button",
      onClick,
      isLoading = false,
      children,
  }: Readonly<CustomButtonProps>) {
    const buttonClassName = variant === "primary" ? "btn-primary" : "btn-warning";
    return (
        <Button
            type={type}
            onClick={onClick}
            isLoading={isLoading}
            className={buttonClassName}
        >
            {children}
        </Button>
    );
}
