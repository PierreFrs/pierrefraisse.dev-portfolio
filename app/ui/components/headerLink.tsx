import Link from "next/link";  

interface HeaderLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
}

export default async function HeaderLink(headerLinkProps: Readonly<HeaderLinkProps>) {
    return (
        <Link 
            href={headerLinkProps.href} 
            className={headerLinkProps.className} 
            target={headerLinkProps.target}
        >
            {headerLinkProps.children}
        </Link>
    );
}