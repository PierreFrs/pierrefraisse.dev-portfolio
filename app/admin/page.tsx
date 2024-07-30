import HeroDescriptionForm from "@/app/ui/components/admin_components/heroDescriptionForm";
import HeroPictureForm from "@/app/ui/components/admin_components/heroPictureForm";
import LogoutButton from "@/app/ui/components/admin_components/logoutButton";
import {getUserId} from "@/app/utilities/sessionManagement";

const userId = (await getUserId()) as string;
export default function AdminPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Update Hero Description</h2>
                <HeroDescriptionForm userId={userId} />
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Update Hero Picture</h2>
                <HeroPictureForm userId={userId}  />
            </section>
            <LogoutButton />
        </div>
    );
}
