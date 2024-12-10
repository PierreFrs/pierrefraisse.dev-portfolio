import Link from "next/link";  

interface HeaderLinkProps {
    href: string;
    children: React.ReactNode;
    target?: string;
}

export default async function HeaderLink(headerLinkProps: Readonly<HeaderLinkProps>) {
    return (
        <Link 
            href={headerLinkProps.href} 
            className="font-bold"
            target={headerLinkProps.target}
        >
            {headerLinkProps.children}
        </Link>
    );
}