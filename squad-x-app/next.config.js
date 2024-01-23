/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kzcrnvmbqviqohszvotu.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
