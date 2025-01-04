import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/blob_storage/:path*',
                destination: '/api/blob_storage/:path*', // Redirect to a custom API route
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/blob_storage/:path*',
                destination: '/api/blob_storage/:path*',
                permanent: false,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
