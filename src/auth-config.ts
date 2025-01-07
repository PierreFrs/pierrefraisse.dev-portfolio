// app/auth-config.ts

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
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },

        async jwt({ token, user }) {
            // If it's the first time, add the user.id to the token
            if (user) {
                token.id = user.id;  // Ensure user.id exists from your provider (GitHub, database, etc.)
            }
            return token;
        },

        async session({ session, token }) {
            try {
                if (token?.id) {
                    session.user.id = token.id as string;
                }
                return session;
            } catch (err) {
                console.error("Error in session callback:", err); // Log detailed error
                throw err;
            }
        },

        async signIn({ user: _user, account: _account, profile }) {
            const allowedEmail = process.env.MY_MAIL;

            // Ensure that the user's email is verified and matches the allowed email
            return profile?.email === allowedEmail;
        },

        authorized: async ({ auth }) => {
            return !!auth
        },

    },
} satisfies NextAuthConfig;