/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Required for the `geist` package below Next.js 15 (App Router).
  transpilePackages: ['geist'],
}

export default config
