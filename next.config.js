/** @type {import('next').NextConfig} */

const generateRobotsTxt = require('./scripts/generate-robots-txt');

const nextConfig = {
	webpack(config, { isServer }) {
		if (isServer) {
			generateRobotsTxt();
		}
		return config;
	},
	async redirects() {
		return [
			{
				source: "/courses",
				destination: "/programs",
				permanent: true,
			},
			{
				source: "/terms",
				destination: "/terms-and-conditions",
				permanent: true,
			},
			{
				source: "/privacy",
				destination: "/privacy-policy",
				permanent: true,
			},
			{
				source: "/our-coaches",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/why-certify",
				destination: "/about-us",
				permanent: true,
			},
			{
				source: "/safe-scrummaster-ssm-certification",
				destination: "/courses/safe-scrum-master-ssm-certification-training",
				permanent: true,
			},
			{
				source: "/certified-scrummaster-csm-certification",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/ssm-certification-safe-scrummaster",
				destination: "/courses/safe-scrum-master-ssm-certification-training",
				permanent: true,
			},
			{
				source: "/safe-devops-practitioner-sdp",
				destination: "/courses/safe-devops-practitioner-sdp-certification-training",
				permanent: true,
			},
			{
				source: "/csm-certification-certified-scrummaster",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/our-coaches/melissa-white",
				destination: "/instructors/melissa-white",
				permanent: true,
			},
			{
				source: "/our-coaches/meenal-tayal",
				destination: "/instructors/amy-tayal",
				permanent: true,
			},
			{
				source: "/our-coaches/harry-narang",
				destination: "/instructors/harry-narang",
				permanent: true,
			},
			{
				source: "/our-coaches/raj-kasturi",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/our-coaches/chet-hendrickson",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/agile-product-management-apm",
				destination: "/courses/safe-agile-product-management-certification-training",
				permanent: true,
			},
			{
				source: "/safe-for-government-sgp",
				destination: "/courses/safe-for-government-sgp-certification-training",
				permanent: true,
			},
			{
				source: "/safe-for-architechts-arch",
				destination: "/courses/safe-for-architects-arch-certification-training",
				permanent: true,
			},
			{
				source: "/our-coaches/peter-saddington",
				destination: "/instructors/peter-saddington",
				permanent: true,
			},
			{
				source: "/our-coaches/eric-tucker",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/courses/safe-devops-sdp",
				destination: "/courses/safe-devops-practitioner-sdp-certification-training",
				permanent: true,
			},
			{
				source: "/our-coaches/rick-waters",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/our-coaches/sekhar-burra",
				destination: "/instructors/sekhar-burra",
				permanent: true,
			},
			{
				source: "/our-coaches/steve-spearman",
				destination: "/instructors/steve-spearman",
				permanent: true,
			},
			{
				source: "/our-coaches/jan-beaver",
				destination: "/instructors/jan-beaver",
				permanent: true,
			},
			{
				source: "/certified-scrum-professional-csp-sm",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/advanced-certified-scrummaster-acsm-certification",
				destination: "/courses/advanced-certified-scrummaster-acsm-certification-training",
				permanent: true,
			},
			{
				source: "/acsm-certification-advanced-certified-scrummaster",
				destination: "/courses/advanced-certified-scrummaster-acsm-certification-training",
				permanent: true,
			},
			{
				source: "/courses/safe-for-government-sgp",
				destination: "/courses/safe-for-government-sgp-certification-training",
				permanent: true,
			},
			{
				source: "/courses/lean-portfolio-management-lpm",
				destination: "/courses/safe-lean-portfolio-management-lpm-certification-training",
				permanent: true,
			},
			{
				source: "/courses/safe-for-architects-arch",
				destination: "/courses/safe-for-architects-arch-certification-training",
				permanent: true,
			},
			{
				source: "/courses/certified-scrum-master-csm",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/why-certify/gain-the-edge",
				destination: "/about-us",
				permanent: true,
			},
			{
				source: "/courses/safe-scrum-master-ssm",
				destination: "/courses/safe-scrum-master-ssm-certification-training",
				permanent: true,
			},
			{
				source: "/courses/agile-product-management-apm",
				destination: "/courses/safe-agile-product-management-certification-training",
				permanent: true,
			},
			{
				source: "/safe-agilist-sa-leading-safe-certification",
				destination: "/courses/leading-safe-agilist-sa-certification-training",
				permanent: true,
			},
			{
				source: "/safe-product-owner-manager-popm-certification",
				destination: "/courses/safe-product-owner-product-manager-popm-certification-training",
				permanent: true,
			},
			{
				source: "/cspo-certification-certified-scrum-product-owner",
				destination: "/courses/certified-scrum-product-owner-cspo-certification-training",
				permanent: true,
			},
			{
				source: "/courses/leading-safe-safe-agilist-sa",
				destination: "/courses/leading-safe-agilist-sa-certification-training",
				permanent: true,
			},
			{
				source: "/courses/safe-product-owner-manager-popm",
				destination: "/courses/safe-product-owner-product-manager-popm-certification-training",
				permanent: true,
			},
			{
				source: "/leading-safe-certification-safe-agilist-sa",
				destination: "/courses/leading-safe-agilist-sa-certification-training",
				permanent: true,
			},
			{
				source: "/popm-certification-safe-product-owner-manager",
				destination: "/courses/safe-product-owner-product-manager-popm-certification-training",
				permanent: true,
			},
			{
				source: "/resources/retaining-millennials-in-the-workplace",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/courses/certified-scrum-product-owner-cspo",
				destination: "/courses/certified-scrum-product-owner-cspo-certification-training",
				permanent: true,
			},
			{
				source: "/courses/advanced-certified-scrummaster-a-csm",
				destination: "/courses/advanced-certified-scrummaster-acsm-certification-training",
				permanent: true,
			},
			{
				source: "/courses/certified-scrum-professional-csp-sm",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/certified-scrum-product-owner-cspo-certification-1",
				destination: "/courses/certified-scrum-product-owner-cspo-certification-training",
				permanent: true,
			},
			{
				source: "/lpm-certification-certified-safe-lean-portfolio-manager",
				destination: "/courses/safe-lean-portfolio-management-lpm-certification-training",
				permanent: true,
			},
			{
				source: "/certified-safe-lean-portfolio-manager-lpm-certification",
				destination: "/courses/safe-lean-portfolio-management-lpm-certification-training",
				permanent: true,
			},
			{
				source: "/resources/7-hr-lessons-learned-during-the-pandemic",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/top-agile-trends-that-will-reshape-businesses-in-2022",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/a-step-by-step-roadmap-to-your-safe-transformation-journey",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/monthly-payment-t-c",
				destination: "/terms-and-conditions",
				permanent: true,
			},
			{
				source: "/our-coaches/tracey-rideout",
				destination: "/instructors/tracey-rideout",
				permanent: true,
			},
			{
				source: "/our-coaches/ryan-zokol",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/our-coaches/ram-srinivasan",
				destination: "/instructors/ram-srinivasan",
				permanent: true,
			},
			{
				source: "/our-coaches/ratika-birla",
				destination: "/instructors",
				permanent: true,
			},
			{
				source: "/courses/certified-scrummaster-csm",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/resources/how-agile-takes-your-small-businesses-to-new-heights",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/small-business",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-tools",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/pandemic",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/sme",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-trends-in-2022",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/business-agility",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/learning-and-development",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/millennials",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/remote-work",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/elearning",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/millennials-in-workplace",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-remote-work",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/resilience",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/entrepreneurs",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-ai",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/startups",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-governance",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/post-pandemic",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/scaled-agile-framework",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/hr-lessons",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/workplace-diversity",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agility",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/covid-19",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/agile-hr",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/tag/safe",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/agile-trends-2022",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/resources/agile-trends-in-2023",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/upcoming-schedule-csm",
				destination: "/courses/certified-scrum-master-csm-certification-training/schedule",
				permanent: true,
			},
			{
				source: "/our-team",
				destination: "/about-us",
				permanent: true,
			},
			{
				source: "/schedule-safe-agilist-sa",
				destination: "/courses/leading-safe-agilist-sa-certification-training/schedule",
				permanent: true,
			},
			{
				source: "/csm-live-online-workshop",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/upcoming-workshops",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/schedule-safe-scrum-master-ssm",
				destination: "/courses/safe-scrum-master-ssm/schedule",
				permanent: true,
			},
			{
				source: "/courses/safe-agilist-sa",
				destination: "/courses/leading-safe-agilist-sa-certification-training",
				permanent: true,
			},
			{
				source: "/safe",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/cspo-upcoming-schedule",
				destination: "/courses/safe-scrum-master-ssm-certification-training/schedule",
				permanent: true,
			},
			{
				source: "/courses/safe-certification",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/scrum/a-csm-advanced-certified-scrummaster-toronto",
				destination: "/courses/advanced-certified-scrummaster-acsm-certification-training",
				permanent: true,
			},
			{
				source: "/upcoming-workshops/csm-certified-scrummaster-toronto-weekend-batch",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/upcoming-workshops/csm-certified-scrummaster-montreal",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/resources/hr-lessons-learned-during-the-pandemic",
				destination: "/404",
				permanent: true,
			},
			{
				source: "/scrum/csm-certified-scrummaster-toronto-weekday",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/scrum/csm-certified-scrummaster-toronto-weekend",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/courses/agile-product-manager-apm",
				destination: "/courses/safe-agile-product-management-certification-training",
				permanent: true,
			},
			{
				source: "/scrum/csm-certified-scrummaster-montreal",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
			{
				source: "/upcoming-workshops/cspo-certified-scrum-product-owner-toronto",
				destination: "/courses/certified-scrum-product-owner-cspo-certification-training",
				permanent: true,
			},
			{
				source: "/csm-upcoming-schedule",
				destination: "/courses/certified-scrum-master-csm-certification-training/schedule",
				permanent: true,
			},
			{
				source: "/csm-cspo",
				destination: "/programs",
				permanent: true,
			},
			{
				source: "/upcoming-workshops/a-csm-advanced-certified-scrummaster-toronto",
				destination: "/courses/advanced-certified-scrummaster-acsm-certification-training",
				permanent: true,
			},
			{
				source: "/scrum/csm-weekend-certified-scrummaster-toronto",
				destination: "/courses/certified-scrum-master-csm-certification-training",
				permanent: true,
			},
		];
	},
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
