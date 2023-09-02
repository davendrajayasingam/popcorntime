/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org']
    },
    redirects: async () =>
    {
        return [
            {
                source: '/p/',
                destination: '/p/1',
                permanent: false
            }
        ]
    }
}

module.exports = nextConfig