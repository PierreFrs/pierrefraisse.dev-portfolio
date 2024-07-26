import HeaderLink from "../headerLink";

export default async function Header() {
    return (
        <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-transparent z-50">
            <div className="text-2xl font-bold text-white">
                <span>
                    Logo
                </span>
            </div>
            <nav className="flex space-x-6">
                <HeaderLink href="#about">About</HeaderLink>
                <HeaderLink href="#projects">Projects</HeaderLink>
                <HeaderLink href="#contact">Contact</HeaderLink>
            </nav>
        </header>
    );
};
