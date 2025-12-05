/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: false,
	images: {
		domains: ["localhost"],
		unoptimized: true,
	},
	env: {
		CUSTOM_KEY: "azure-deployment",
	},
};

export default nextConfig;
