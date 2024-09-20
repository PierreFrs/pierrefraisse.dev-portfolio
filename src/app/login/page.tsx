import {auth} from "@/auth";
import {SignOut} from "@/components/signout_components/signOutButton";
import LoginForm from "@/components/login_component/loginForm";

export default async function LoginPage() {
    const session = await auth();

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                {session ? (
                    <SignOut />  // Show SignOut button if session exists
                ) : (
                    <LoginForm />  // Show LoginForm if no session
                )}
            </div>
        </main>
    );
}
