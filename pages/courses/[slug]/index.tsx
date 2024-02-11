import Layout from "../../../Components/layouts/Layout";
import Introduction from "../../../Components/LandingPage/Hero";
import { useState, useEffect } from "react";
import MiniNav from "../../../Components/LandingPage/MiniNav";
import { useScreenDimensions } from "use-screen-dimensions";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import { GetStaticPaths } from "next";
import {
	ButtonType,
	CourseTagType,
	HeadingType,
	HeadingType2,
	Heading_type,
	InstructorCardType,
	ReviewType,
	TestimonialCardType,
	cardType,
	image_type,
	image_type2,
	images,
	AnalyticsType,
	SeoType,
	CourseCardType,
} from "../../../interfaces/interfaces";
import React from "react";
import dynamic from "next/dynamic";

import { dispatch } from "../../../redux/store";
import { scheduleActions } from "../../../redux/slices/schedule";

const CsDetails = dynamic(
	() => import("../../../Components/LandingPage/CsDetails"),
	{ ssr: false }
);
const Topics = dynamic(() => import("../../../Components/LandingPage/Topics"), {
	ssr: false,
});
const Advantages = dynamic(
	() => import("../../../Components/LandingPage/Advantages"),
	{ ssr: false }
);
const Steps = dynamic(() => import("../../../Components/LandingPage/Steps"), {
	ssr: false,
});
const Learn = dynamic(() => import("../../../Components/LandingPage/Learn"), {
	ssr: false,
});
const Earn = dynamic(() => import("../../../Components/LandingPage/Earn"), {
	ssr: false,
});
const Attend = dynamic(() => import("../../../Components/LandingPage/Attend"), {
	ssr: false,
});
const Tools = dynamic(() => import("../../../Components/LandingPage/Tools"), {
	ssr: false,
});
const InteractiveLearning = dynamic(
	() => import("../../../Components/LandingPage/InteractiveLearning"),
	{ ssr: false }
);
const CareerPath = dynamic(
	() => import("../../../Components/LandingPage/CareerPath"),
	{ ssr: false }
);
const Prerequisite = dynamic(
	() => import("../../../Components/LandingPage/Prerequisite"),
	{ ssr: false }
);
const KeyBenefits = dynamic(
	() => import("../../../Components/LandingPage/KeyBenefits"),
	{ ssr: false }
);
const OrganizationBenefits = dynamic(
	() => import("../../../Components/LandingPage/OrganizationBenefits"),
	{ ssr: false }
);
const Trusted = dynamic(() => import("../../../Components/LandingPage/Trusted"), {
	ssr: false,
});
const LearningGoals = dynamic(
	() => import("../../../Components/LandingPage/LearningGoals"),
	{ ssr: false }
);
const MeetInstructors = dynamic(
	() => import("../../../Components/MeetInstructors"),
	{ ssr: false }
);
const EarlyBird = dynamic(() => import("../../../Components/EarlyBird"), {
	ssr: false,
});
const UpSkilling = dynamic(() => import("../../../Components/UpSkilling"), {
	ssr: false,
});
const FAQ = dynamic(() => import("../../../Components/LandingPage/FAQ"), {
	ssr: false,
});

type Props = {
	scheduleData: any;
	pagedata: {
		breadcrumb_text: string;
		seo: SeoType;
		slug: string;
		introduction: {
			heading: HeadingType2;
			video: image_type;
			video_course_logo: image_type;
			video_tag: string;
			video_thumbnail: image_type;
			points: {
				Text: string;
				Icon: image_type;
			}[];
			reviews: ReviewType[];
			landing_page_features: {
				Text: string;
				Icon: image_type;
			}[];
			original_price: string;
			discount_price: string;
			icons: {
				data: image_type2[];
			};
		};
		sub_menu: {
			Item: string;
			scroll_id: string;
		}[];
		course_details: {
			heading: HeadingType2;
			image: images;
			highlighted_heading: Heading_type;
			sub_text: Heading_type;
			scroll_id: string;
		};
		key_benefits: {
			heading: Heading_type;
			benefit: {
				key: string;
				value: string;
				colour: string;
			}[];
			chart: {
				name: string;
				depth: number;
				value: number;
				color: string;
				icon: image_type;
				hover_text: string;
			}[];
			scroll_id: string;
		};
		org_benefits: {
			name: string;
			benefit: {
				Icon: image_type;
				Text: string;
			}[];
		}[];
		trusted: {
			heading: Heading_type;
			Desc: string;
			Stats: {
				Name: string;
				Num: string;
			}[];
			stats_heading_tag: string;
			testimonial_cards: {
				data: TestimonialCardType[];
			};
			Button: ButtonType;
			scroll_id: string;
		};
		step: {
			heading_badge: Heading_type;
			heading: Heading_type;
			step: {
				normal_text: string;
				bold_text: string;
			}[];
			image: images;
			scroll_id: string;
		};
		learn: {
			heading: Heading_type;
			carousel_images: images[];
			step: HeadingType2[];
			scroll_id: string;
		};
		earn: {
			heading: Heading_type;
			scroll_id: string;
		};
		EarnCards: {
			image: image_type;
			desc: string;
		}[];
		who_should_attend: {
			heading: HeadingType2;
			button: ButtonType;
			tags: {
				heading: string;
			}[];
			scroll_id: string;
		};
		prerequisite: {
			heading_badge: Heading_type;
			heading: HeadingType2;
			points_heading: Heading_type;
			scroll_id: string;
		};
		exam_format: {
			point: HeadingType[];
		}[];
		advantage: {
			heading: Heading_type;
			heading_badge: Heading_type;
			Points: cardType[];
			point_heading_tag: string;
			scroll_id: string;
		};
		learning: {
			heading: Heading_type;
			Sub_heading: HeadingType2;
			scroll_id: string;
		};
		tools: {
			heading: Heading_type;
			heading_row_1: HeadingType2;
			points_row_1: {
				Item: string;
			}[];
			heading_row_2: HeadingType2;
			points_row_2: {
				Item: string;
			}[];
			image_row_1: images;
			image_row_2: images;
			scroll_id: string;
		};
		instructors: {
			Heading: HeadingType2;
			Button: ButtonType;
			in_car: {
				data: InstructorCardType[];
			};
			course_filters: CourseTagType;
			scroll_id: string;
		};
		topics: {
			heading_badge: Heading_type;
			heading: Heading_type;
			cards: {
				Text: string;
				Icon: image_type;
			}[];
			button: ButtonType;
			scroll_id: string;
		};
		learning_goals: {
			heading: Heading_type;
			points: {
				Item: string;
			}[];
			icon: image_type;
			scroll_id: string;
		};
		career_path: {
			heading_badge: Heading_type;
			heading: HeadingType2;
			points: {
				Item: string;
			}[];
			button: ButtonType;
			image: images;
			scroll_id: string;
		};
		upskilling: {
			Heading: HeadingType2;
			Button: ButtonType;
			icon: {
				original_icon: image_type;
				hover_icon: image_type;
			}[];
			scroll_id: string;
		};
		faq: {
			highlighted_heading: Heading_type;
			Questions: {
				id: number;
				Ques: string;
				Answer: string;
			}[];
			scroll_id: string;
			heading_badge: Heading_type;
		};
		early_bird: {
			highlighted_heading: Heading_type;
			schedule_button: ButtonType;
			more_info_btn: ButtonType;
		};
		card: {
			Course_logo: images;
		};
		schedule_id: number;
		filter_category: string;
	};
	courses: {
		attributes: CourseCardType;
	}[];
};

export default function LandingPage(props: Props) {
	const [RMA, setRMA] = useState(false);
	const { width } = useScreenDimensions();
	const [showMore, setShowMore] = React.useState(false)
	const [activeTestimonial, setActiveTest] = React.useState<any>();

	const isMobile = width < 950;

	const { fetchSchedule, fetchTimeZone } = scheduleActions;
	// const { fetchTimeZone } = timezoneActions;

	useEffect(() => {
		const getData = async () => {
			await dispatch(fetchTimeZone({ id: props?.pagedata?.schedule_id, filter_category: props?.pagedata?.filter_category, data: props?.scheduleData }));
			// dispatch(fetchSchedule({ id: props?.pagedata?.schedule_id, filter_category: props?.pagedata?.filter_category }));
		}
		getData();
	}, []);

	return (
		<>
			<Layout>
				<BreadCrumbs
					color="#fff"
					text={props.pagedata.breadcrumb_text}
					page="courses"
				/>
				<Introduction
					slug={props?.pagedata?.slug}
					data={props.pagedata?.introduction}
					early_bird={props.pagedata?.early_bird}
					schedule_id={props?.pagedata?.schedule_id}
					card={props?.pagedata?.card}
				/>
				<MiniNav menuItems={props.pagedata.sub_menu} />
				<CsDetails data={props.pagedata.course_details} />
				<KeyBenefits data={props.pagedata.key_benefits} />
				<OrganizationBenefits data={props.pagedata.org_benefits} />
				<Trusted
					homepage={false}
					data={props.pagedata.trusted}
					setActiveTest={setActiveTest}
					setShowMore={setShowMore}
				/>
				<Steps data={props.pagedata.step} />
				<Learn data={props.pagedata.learn} />
				<Earn
					data={props.pagedata.earn}
					cards={props.pagedata.EarnCards}
				/>
				<Attend data={props.pagedata.who_should_attend} />
				<Prerequisite
					data={props.pagedata.prerequisite}
					points={props.pagedata.exam_format}
				/>
				<Advantages data={props.pagedata.advantage} />
				<InteractiveLearning data={props.pagedata.learning} />
				<Tools
					color={"#f4fdf8"}
					data={props.pagedata.tools}
				/>
				<MeetInstructors
					color={!isMobile ? "#fff" : "#E8E8E8"}
					data={props.pagedata.instructors}
				/>
				<Topics data={props.pagedata.topics} />
				<LearningGoals data={props.pagedata.learning_goals} />
				<CareerPath data={props.pagedata.career_path} />
				<UpSkilling
					setData={setRMA}
					data={props.pagedata.upskilling}
				/>
				{!isMobile && (
					<EarlyBird
						data={RMA}
						content={props.pagedata.early_bird}
						slug={props?.pagedata?.slug}
						schedule_id={props?.pagedata?.schedule_id}
					/>
				)}
				<FAQ
					early_bird={props.pagedata?.early_bird}
					schedule_id={props?.pagedata?.schedule_id}
					slug={props?.pagedata?.slug}
					label
					data={props.pagedata.faq}
				/>
			</Layout>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/courses`);
	const courses = await res.json();
	const slugs = courses?.data?.map((post: any) => post.attributes.slug);
	const paths = slugs?.map((slug: string) => ({
		params: { slug: slug.toString() },
	}));

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	};
};

export const getStaticProps = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const res1 = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/header?publicationState=${process.env.PUBLICATION}&populate=deep,4`
	);
	const header_data = await res1.json();

	const res3 = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/footer?publicationState=${process.env.PUBLICATION}&populate=deep,10`
	);
	const footer_data = await res3.json();

	const res2 = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/courses?publicationState=${process.env.PUBLICATION}&filters[slug]=${params.slug}&populate=deep,10`
	);
	const data = await res2.json();
	const analytics = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/seo-page?publicationState=${process.env.PUBLICATION}&populate=deep,10`
	);
	const analytics_data = await analytics.json();

	const res4 = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/courses?publicationState=${process.env.PUBLICATION}&populate[card][populate][0]=name,10`
	);
	const course_data = await res4.json();

	const scheduleId = data?.data[0]?.attributes?.course_schedule?.data?.attributes?.get_schedule_id || null

	const scheduleres = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/get-schedules?course_id=${scheduleId}&prod=${process.env.ENABLE_SEO}`)

	const scheduleRes = await scheduleres.json();

	// let msg = JSON.stringify(scheduleRes?.message);
	// if (msg?.includes("Access")) {
	// 	throw JSON.stringify(msg);
	// }
	const scheduleData = scheduleId != null ?
		scheduleRes?.data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")
		: [];
	return {
		// Passed to the page component as props
		props: {
			analytics: analytics_data?.data?.attributes || null,
			header: header_data?.data?.attributes,
			footer: footer_data?.data?.attributes,
			courses: course_data?.data,
			scheduleData: scheduleData || null,
			pagedata: {
				breadcrumb_text: data?.data[0]?.attributes?.breadcrumb_text,
				slug: data?.data[0]?.attributes?.slug,
				card: data?.data[0]?.attributes?.card,
				introduction: data?.data[0]?.attributes?.introduction,
				sub_menu: data?.data[0]?.attributes?.sub_menu,
				course_details: data?.data[0]?.attributes?.course_details,
				key_benefits: data?.data[0]?.attributes?.key_benefits,
				org_benefits: data?.data[0]?.attributes?.organization_benefits,
				trusted: data?.data[0]?.attributes?.trusted,
				step: data?.data[0]?.attributes?.step,
				learn: data?.data[0]?.attributes?.learn,
				earn: data?.data[0]?.attributes?.Earn,
				EarnCards: data?.data[0]?.attributes?.EarnCards,
				who_should_attend: data?.data[0]?.attributes?.who_should_attend,
				prerequisite: data?.data[0]?.attributes?.prerequisite,
				exam_format: data?.data[0]?.attributes?.exam_format,
				advantage: data?.data[0]?.attributes?.advantage,
				learning: data?.data[0]?.attributes?.interactive_learning,
				tools: data?.data[0]?.attributes?.tools,
				instructors: data?.data[0]?.attributes?.instructors,
				topics: data?.data[0]?.attributes?.topics,
				learning_goals: data?.data[0]?.attributes?.learning_goals,
				career_path: data?.data[0]?.attributes?.career_path,
				upskilling: data?.data[0]?.attributes?.upskilling,
				faq: data?.data[0]?.attributes?.faq,
				early_bird: data?.data[0]?.attributes?.early_bird,
				seo: data?.data[0]?.attributes?.seo,
				schedule_id: data?.data[0]?.attributes?.course_schedule?.data?.attributes?.get_schedule_id || null,
				filter_category: data?.data[0]?.attributes?.course_schedule?.data?.attributes?.filter_category?.data?.attributes?.category || null,
			},
		},
	};
};
