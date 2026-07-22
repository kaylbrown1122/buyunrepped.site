const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://assets.calendly.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://images.unsplash.com;
    font-src 'self' data:;
    connect-src 'self' https://calendly.com https://*.calendly.com;
    frame-src https://calendly.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains',
    },
];

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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
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
            // The long-form guides section was removed and the /guides hub was
            // consolidated into /resources. Redirect the hub and any /guides/<slug>.
            {
                source: '/guides',
                destination: '/resources',
                permanent: true,
            },
            {
                source: '/guides/:slug',
                destination: '/resources',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
