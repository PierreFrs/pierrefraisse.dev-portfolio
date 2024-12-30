import {signIn} from "@/auth";
import {Button} from "@nextui-org/react";
import {FaGithub} from "react-icons/fa";

export default function LoginForm() {
    return (
        <div>
            <form action={async () => {
                "use server";
                await signIn("github", {redirectTo: "/admin"});
            }}>
                <Button
                    color="default"
                    size="md"
                    variant="bordered"
                    type="submit"
                    className="flex items-center justify-center space-x-2 dark:text-white-100"
                >
                    <FaGithub className="h-5 w-5" />
                    <p className="text-sm">Sign In with GitHub</p>
                </Button>
            </form>
        </div>
    );
}