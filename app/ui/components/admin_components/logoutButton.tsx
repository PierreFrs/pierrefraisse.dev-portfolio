import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function LogoutButton() {
    return (
        <form
            action={async () => {
                await signOut();
            }}
        >
            <button
                className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
                <PowerIcon className="w-6" />
                <span>Sign Out</span>
            </button>
        </form>
    );
}
