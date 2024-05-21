const nextConfig = {
    output: "export",
    basePath: "/nextjs-github-pages",
    reactStrictMode: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: "jakartasatu.jakarta.go.id",
            },
            {
                hostname: "fakeimg.pl"
            }
        ]

    },
}

module.exports = nextConfig
