import HeaderLink from "../shared_components/headerLink";

export default async function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <span>
                        Pierre Fraisse
                    </span>
                </div>
                <nav className="header-links-container">
                    <HeaderLink href={"#about"}>About</HeaderLink>
                    <HeaderLink href={"#projects"}>Projects</HeaderLink>
                    <HeaderLink href={"#contact"}>Contact</HeaderLink>
                </nav>
            </div>

        </header>
    );
};
