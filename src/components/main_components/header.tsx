import HeaderLink from "../headerLink";

export default async function Header() {
    return (
        <header className="top-0 w-full flex justify-between items-center px-6 py-4 bg-transparent z-50">
            <div className="text-xl font-bold uppercase">
                <span>
                    Pierre Fraisse
                </span>
            </div>
            <nav className="flex space-x-6">
                <HeaderLink href={"#about"}>About</HeaderLink>
                <HeaderLink href={"#projects"}>Projects</HeaderLink>
                <HeaderLink href={"#contact"}>Contact</HeaderLink>
            </nav>
        </header>
    );
};
