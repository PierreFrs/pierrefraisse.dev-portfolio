import {signIn} from "@/auth";

export default function LoginForm() {
    return (
        <>
            <form action={async () => {
                "use server";
                await signIn("github", {redirectTo: "/admin"});
            }}>
                <button type="submit">Sign In with GitHub</button>
            </form>
        </>

    );
}