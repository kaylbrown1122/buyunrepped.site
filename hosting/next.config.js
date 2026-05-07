/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/resources/tennessee-first-time-home-buyer-guide',
                destination: '/resources/tennessee-move-up-home-buyer-guide',
                permanent: true,
            },
            {
                source: '/guides/tennessee-first-time-home-buyer-guide',
                destination: '/guides/tennessee-move-up-home-buyer-guide',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
