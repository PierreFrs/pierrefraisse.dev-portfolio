import type {NextAuthConfig} from 'next-auth';
import Github from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "../prisma/prisma";

export const authConfig = {
    debug: true, 
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    pages: {
        error: '/auth/error',
        signIn: '/login',
        signOut: '/login',
    },
    providers: [Github],
    callbacks: {
        async redirect({url, baseUrl}) {
            if (url === '/admin') {
                return url;
            }
            return baseUrl + '/admin';
        },

        async jwt({ token, user }) {
            // If it's the first time, add the user.id to the token
            if (user) {
                token.id = user.id;  // Ensure user.id exists from your provider (GitHub, database, etc.)
            }
            return token;
        },

        async session({ session, token }) {
            // Attach the user id from the token to the session
            if (token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        },

        authorized: async ({ auth }) => {
            return !!auth
        },

    },
} satisfies NextAuthConfig;