/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // needed for Google profile images
  },

  async headers() {
    return [
      {
        source: '/(.*)', // applies globally — or narrow to /auth/(.*)
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none', // ✅ disables isolation so popup can close
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none', // ✅ avoids COEP-related blocks
          },
        ],
      },
    ];
  },
};

export default nextConfig;
