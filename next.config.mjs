/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch potential issues
  swcMinify: true, // Enables minification for performance
  
  images: {
    domains: ["lh3.googleusercontent.com", "i.pinimg.com"], // Allowed image domains
  },
};

export default nextConfig;
