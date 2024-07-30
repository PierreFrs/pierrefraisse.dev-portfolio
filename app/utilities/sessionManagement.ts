import { getSession } from "next-auth/react";

export async function getUserId() {
    const session = await getSession();
    if (session?.user) {
        return session.user.id; // Assuming `id` is part of the session's user object
    } else {
        console.log("No user session found.");
        return null;
    }
}
