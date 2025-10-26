/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // needed for Google profile images
  },

  // ✅ Add headers to relax COOP/COEP so Google popup can close itself
  async headers() {
    return [
      {
        source: '/(.*)', // Apply globally (or narrow this to /auth/*)
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', // ✅ allows OAuth popups
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // ✅ removes isolation blocking
          },
        ],
      },
    ];
  },
};

export default nextConfig;
