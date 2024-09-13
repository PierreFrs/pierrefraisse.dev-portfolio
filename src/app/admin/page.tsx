import HeroDescriptionForm from "@/app/ui/components/admin_components/heroDescriptionForm";
import HeroPictureForm from "@/app/ui/components/admin_components/heroPictureForm";
import LogoutButton from "@/app/ui/components/admin_components/logoutButton";
import {auth} from "@/auth";

export default async function AdminPage() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session) {
        return (
            <div>
                <h1>Access denied</h1>
                <h2>Session not found</h2>
            </div>
        );
    }

    if (!userId) {
        return (
            <div>
                <h1>Access denied</h1>
                <h2>{JSON.stringify(session, null, 2)}</h2> {/* Debugging session data */}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Update Hero Description</h2>
                <HeroDescriptionForm userId={userId} />
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Update Hero Picture</h2>
                <HeroPictureForm userId={userId} />
            </section>
            <LogoutButton />
        </div>
    );
}
