import {auth} from "@/auth";
import HeroDescriptionForm from "@/components/admin_components/heroDescriptionForm";
import HeroPictureForm from "@/components/admin_components/heroPictureForm";
import LogoutButton from "@/components/admin_components/logoutButton";
import ProjectUploadForm from "@/components/admin_components/projectUploadForm";
import React from "react";
import BadgeUploadForm from "@/components/admin_components/badgeUploadForm";
import {AdminProjectsGallery} from "@/components/admin_components/adminProjectsGallery";
import {AdminBadgesGallery} from "@/components/admin_components/adminBadgesGallery";
import {Divider} from "@nextui-org/react";

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
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Update Hero Picture</h2>
                <HeroPictureForm userId={userId} />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upload Projects</h2>
                <ProjectUploadForm />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Projects Gallery</h2>
                <AdminProjectsGallery />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Upload Badges</h2>
                <BadgeUploadForm />
            </section>
            <Divider className="my-4" />
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Badges Gallery</h2>
                <AdminBadgesGallery />
            </section>
            <LogoutButton />
        </div>
    );
}
