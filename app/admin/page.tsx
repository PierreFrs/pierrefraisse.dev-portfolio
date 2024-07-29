import HeroDescriptionForm from "@/app/ui/components/admin_components/heroDescriptionForm";
import HeroPictureForm from "@/app/ui/components/admin_components/heroPictureForm";

export default function AdminPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Update Hero Description</h2>
                <HeroDescriptionForm />
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Update Hero Picture</h2>
                <HeroPictureForm />
            </section>
        </div>
    );
}
