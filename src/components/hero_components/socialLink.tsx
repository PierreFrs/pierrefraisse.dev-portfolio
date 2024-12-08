import React from "react";
import Link from "next/link";

interface SocialLinkProps {
    href: string;
    network: string;
    icon: React.ReactNode;
    className?: string;
}
export default function SocialLink(socialLinkProps: Readonly<SocialLinkProps>) {
    const { href, network, icon, className } = socialLinkProps;

    const networkClass = network.toLowerCase();

    return (
        <Link
            href={href}
            passHref
            className={`social-link ${networkClass} ${className || ""}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon} {network}
        </Link>
        );
}