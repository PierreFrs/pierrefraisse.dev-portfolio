import {ThemeSwitcher} from "@/components/shared_components/theme-switcher";
import {LanguagePicker} from "@/components/shared_components/languagePicker";

export default async function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <span>
                        Pierre Fraisse
                    </span>
                </div>
                <div className="header-controls">
                    <LanguagePicker />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};
