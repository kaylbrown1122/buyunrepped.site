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
        // Blog posts removed in the July 2026 content reset. Their old
        // /resources/<slug> URLs 404 without these; send them to the blog index.
        // (/resources/<slug> still serves live posts, so each retired slug is listed.)
        const retiredPostSlugs = [
            'buyer-agent-commission-secrets',
            'buyer-agent-commissions-2026',
            'buyer-agent-cost-tennessee',
            'buyer-broker-agreements-explained',
            'buyers-agent-after-nar-settlement',
            'buying-home-without-buyers-agent-guide',
            'chattanooga-home-buying-guide',
            'flat-fee-broker-vs-buyers-agent',
            'franklin-brentwood-home-buying-guide',
            'knoxville-home-buying-guide',
            'memphis-home-buying-guide',
            'nar-settlement-guide-tennessee-buyers',
            'nar-settlement-home-buyers-2026',
            'nar-settlement-what-changed-buyers-listicle',
            'nashville-home-buying-guide',
            'negotiate-directly-sellers-agent',
            'purchase-agreement-red-flags',
            'questions-ask-listing-agent-unrepresented',
            'seller-concessions-tennessee-guide',
            'tennessee-cities-save-unrepresented',
            'tennessee-closing-costs-fees-guide',
            'tennessee-home-inspection-issues',
            'tennessee-loan-programs-2026',
            'tennessee-move-up-home-buyer-guide',
            'tennessee-rules-first-time-buyers',
            'when-you-dont-need-buyers-agent',
            'when-you-might-want-buyers-agent',
        ];

        return [
            {
                source: '/resources/tennessee-first-time-home-buyer-guide',
                destination: '/resources',
                permanent: true,
            },
            ...retiredPostSlugs.map((slug) => ({
                source: `/resources/${slug}`,
                destination: '/resources',
                permanent: true,
            })),
            // The entire long-form guides section was removed. /guides itself
            // remains as the Resources hub; any /guides/<slug> is retired.
            {
                source: '/guides/:slug',
                destination: '/resources',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
