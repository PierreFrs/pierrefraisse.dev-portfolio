import {signIn} from "@/auth";
import {Button} from "@nextui-org/react";

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
                    type="submit">Sign In with GitHub</Button>
            </form>
        </div>
    );
}