import LoginForm from '@/app/ui/components/login_component/loginForm';
import {SignOut} from "@/app/ui/components/signout_components/signOutButton";
import {auth} from "@/auth";

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
