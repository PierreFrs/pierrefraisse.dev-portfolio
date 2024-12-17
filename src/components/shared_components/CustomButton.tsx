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
    const buttonType = variant === "primary" ? "default" : "danger";
    return (
        <Button
            type={type}
            isLoading={isLoading}
            radius="sm"
            size="md"
            color={buttonType}
            onClick={(e) => {
                e.stopPropagation(); // Ensure propagation does not interfere
                if (onClick) onClick();
            }}
        >
            {children}
        </Button>
    );
}
