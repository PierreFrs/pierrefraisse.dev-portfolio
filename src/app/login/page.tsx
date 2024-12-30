import {auth} from "@/auth";
import {SignOut} from "@/components/signout_components/signOutButton";
import LoginForm from "@/components/login_component/loginForm";

export default async function LoginPage() {
    const session = await auth();

    return (
        <div className="homepage">
            {session ? (
                <SignOut />  // Show SignOut button if session exists
            ) : (
                <LoginForm />  // Show LoginForm if no session
            )}
        </div>
    );
}
