import React, { useEffect } from "react";
import Sessions from "../../../Components/Sessions";
import { GetStaticPaths } from "next";
import { Heading_type, } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { scheduleActions } from "../../../redux/slices/schedule";
import { dispatch } from "../../../redux/store";


type Props = {
	scheduleData: any;
	coachpage: {
		trainer: {
			name: Heading_type;
		};
	};
	schedule_messages: {
		more_schedule_message: string;
		no_schedule_message: string;
		register_btn: string;
		learn_more_btn: string;
		more_schedule_btn: string;
		other_options_btn: string;
	}
};

export default function Coaches(props: Props) {

	const { fetchTimeZone } = scheduleActions;

	const { allSchedule, timezone } = useSelector((state: any) => state.schedule);
	const { allScheduleData } = allSchedule

	const { timezoneData, loading } = timezone;

	const filterdata = allScheduleData?.filter((e: any) => {
		return e.instructor_name?.toLowerCase().replace(/ /g, "") === props?.coachpage?.trainer?.name?.text?.toLowerCase().replace(/ /g, "");
	})

	useEffect(() => {
		const getData = async () => {
			await dispatch(fetchTimeZone({ data: props?.scheduleData, allSchedules: true }))
		}
		getData();
	}, []);

	return (
		<Sessions
			data={filterdata || []}
			timezone={timezoneData}
			isInstructor
			loading={loading}
			schedule_messages={props?.schedule_messages}
		/>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/coach-pages`);
	const coaches = await res.json();
	const slugs = coaches?.data?.map((post: any) => post.attributes.slug);

	const paths = slugs.map((slug: string) => ({
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
	const res2 = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_URL}/coach-pages?publicationState=${process.env.PUBLICATION}&filters[slug]=${params.slug}&populate=deep,10`
	);
	const coachpage_data = await res2.json();

	const schedule_messages = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/schedule-message?publicationState=${process.env.PUBLICATION}&populate=deep,10`)

	const messages = await schedule_messages.json();

	const scheduleres = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/get-schedules?course_id=&prod=${process.env.ENABLE_SEO}`)

	const scheduleRes = await scheduleres.json();
	const scheduleData = scheduleRes?.data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")

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
			coachpage: {
				trainer: coachpage_data?.data[0]?.attributes?.trainer || null,
			},
		},
	};
};
