/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The legacy templates ship with inline event handlers, jQuery globals, and
  // HTTrack-mirrored markup. We render that markup as-is, so keep ESLint/TS from
  // blocking production builds on the vendored front-end.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
