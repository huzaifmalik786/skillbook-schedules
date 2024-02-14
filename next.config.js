/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["strapis3images.s3.amazonaws.com", "i.ibb.co", "media.skillbookacademy.com"],
		unoptimized: true
	},
	optimizeFonts: true,
	env: {
		IP_STACK_API_KEY: process.env.IP_STACK_API_KEY,
		ENABLE_SEO: process.env.ENABLE_SEO
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	}
};

module.exports = nextConfig;
