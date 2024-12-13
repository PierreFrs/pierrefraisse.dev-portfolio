import {ThemeSwitcher} from "@/components/shared_components/theme-switcher";

export default async function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <span>
                        Pierre Fraisse
                    </span>
                </div>
                <ThemeSwitcher />
            </div>
        </header>
    );
};
