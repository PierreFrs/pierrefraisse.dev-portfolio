import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnMainPage = nextUrl.pathname === '/';
        if (isOnMainPage) {
            return true;// Redirect unauthenticated users to login page
        } 
        if (isLoggedIn) {
            return true;
        }
        return false;
    },
},
providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
