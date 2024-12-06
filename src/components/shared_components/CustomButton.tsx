import React from "react";

type CustomButtonProps = {
    variant: "primary" | "warning";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
};

export function CustomButtonComponent({
                                          variant,
                                          type = "button",
                                          onClick,
                                          children,
                                      }: Readonly<CustomButtonProps>) {
    const buttonClass = variant === "primary" ? "btn-primary btn-component" : "btn-warning btn-component";

    return (
        <button type={type} onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}
