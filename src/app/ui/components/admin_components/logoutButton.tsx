import { PowerIcon } from "@heroicons/react/24/outline";
import * as actions from "app/actions";

export default function LogoutButton() {
    return (
        <form action={actions.signOut}>
            <button
                className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                type="submit"
            >
                <PowerIcon className="w-6" />
                <span>Sign Out</span>
            </button>
        </form>
    );
}
