import { useEffect } from "react";

//redux
import { dispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { scheduleActions } from "../../../../redux/slices/schedule";

import Sessions from "../../../../Components/Sessions";
import { GetStaticPaths } from "next";
import { images } from "../../../../interfaces/interfaces";
import React from "react";

type Props = {
	scheduleData: any;
	pagedata: {
		schedule_id: number;
		filter_category: string;
		read_more: {
			position: string;
			about: string;
			image: images;
			highlight_images: images[];
			get_coach_name: string;
		}[];
	};
	schedule_messages: {
		more_schedule_message: string;
		no_schedule_message: string;
		register_btn: string;
		learn_more_btn: string;
		more_schedule_btn: string;
		other_options_btn: string;
	};
};

export default function Schedule(props: Props) {
	const { fetchTimeZone } = scheduleActions;

	const { schedule, timezone } = useSelector((state: any) => state.schedule);
	const { data } = schedule;

	const { timezoneData, loading } = timezone;

	useEffect(() => {
		const getData = async () => {
			await dispatch(fetchTimeZone({ id: props?.pagedata?.schedule_id, filter_category: props?.pagedata?.filter_category, data: props?.scheduleData }));
		};
		getData();
	}, []);

	return (
		<Sessions
			data={data[props?.pagedata?.schedule_id]?.filteredData || []}
			timezone={timezoneData}
			read_more_all={props?.pagedata?.read_more}
			loading={loading}
			originalData={data[props?.pagedata?.schedule_id]?.originalData || []}
			filter_category={props?.pagedata?.filter_category}
			schedule_messages={props?.schedule_messages}
		/>
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
		fallback: 'blocking', // can also be true or 'blocking'
	};
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
	const res2 = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/courses?filters[slug]=${params.slug}&populate=deep,10`);
	const data = await res2.json();

	const schedule_messages = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/schedule-message?populate=deep,10`)

	const messages = await schedule_messages.json();

	const scheduleId = data?.data[0]?.attributes?.course_schedule?.data?.attributes?.get_schedule_id || null;

	const scheduleres = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/get-schedules?course_id=${scheduleId}&prod=${process.env.ENABLE_SEO}`)

	const scheduleRes = await scheduleres.json();

	const scheduleData = scheduleId != null ? scheduleRes?.data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide") : [];

	return {
		// Passed to the page component as props
		props: {
			scheduleData: scheduleData || null,
			schedule_messages: {
				more_schedule_message: messages?.data?.attributes?.more_schedule_message || null,
				no_schedule_message: messages?.data?.attributes?.no_schedule_message || null,
				learn_more_btn: messages?.data?.attributes?.learn_more_btn || null,
				register_btn: messages?.data?.attributes?.register_btn || null,
				more_schedule_btn: messages?.data?.attributes?.more_schedule_btn || null,
				other_options_btn: messages?.data?.attributes?.other_options_btn || null,
			},
			pagedata: {
				schedule_id: data?.data[0]?.attributes?.course_schedule?.data?.attributes?.get_schedule_id || null,
				filter_category: data?.data[0]?.attributes?.course_schedule?.data?.attributes?.filter_category?.data?.attributes?.category || null,
				read_more: data?.data[0]?.attributes?.course_schedule?.data?.attributes?.read_more_coach || null,
			},
		},
		revalidate: 7200
	};
};
