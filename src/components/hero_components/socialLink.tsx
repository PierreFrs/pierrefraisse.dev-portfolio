import React from "react";
import Link from "next/link";

interface SocialLinkProps {
    href: string;
    network: string;
    icon: React.ReactNode;
    className?: string;
}
export default function SocialLink(socialLinkProps: Readonly<SocialLinkProps>) {
    return (
        <Link href={socialLinkProps.href} passHref
              className={socialLinkProps.className}
              target="_blank"
              rel="noopener noreferrer"
        >
            {socialLinkProps.icon} {socialLinkProps.network}
        </Link>
        );
}