import React from "react";
import { CourseCardType } from "../interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import Styles from "../styles/components/coursecard.module.scss";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "./CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
	card: CourseCardType;
	smallcard?: boolean
};

const CourseCard = (props: Props) => {
	const { width } = useScreenDimensions();

	const isMobile = width < 950;

	return (
		<div className={props.smallcard ? `${Styles.course_card} ${Styles.small_card}` : Styles.course_card}>
			<Image
				src={props.card?.card?.Cover_image?.desktop_image?.data?.attributes?.url}
				height={152}
				width={302}
				alt={props.card?.card?.Cover_image?.desktop_image?.data?.attributes?.alternativeText}
				className={Styles.card_img}
			/>
			<div className={Styles.card_header}>
				<span className={Styles.difficulty}>
					{props.card?.card?.Difficulty}
				</span>

				<span className={Styles.live}>{props.card?.card?.Live}</span>
			</div>

			<div className={`${Styles.card_content} ${Styles.card_content_1}`}>
				<div className={Styles.heading}>
					{props?.card?.card?.name?.tag ? (
						<CreateHeading
							tag={props?.card?.card?.name.tag}
							children={{ className: `${Styles.name} h6` }}
							text={props?.card?.card?.name?.text}
						/>
					) : (
						<h6 className={`${Styles.name} h6`}>
							{props.card?.card?.name?.text}
						</h6>
					)}
					<Image
						src={
							isMobile
								? props.card?.card?.Course_logo?.mobile_image?.data?.attributes
									?.url
								: props.card?.card?.Course_logo?.mobile_image?.data?.attributes
									?.url
						}
						height={49.77}
						width={55}
						alt={
							isMobile
								? props.card?.card?.Course_logo?.mobile_image?.data?.attributes
									?.alternativeText
								: props.card?.card?.Course_logo?.mobile_image?.data?.attributes
									?.alternativeText
						}
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className={Styles.desc}>
					<ReactMarkdown
						className="p"
						rehypePlugins={[rehypeRaw]}
					>
						{props.card?.card?.Desc}
					</ReactMarkdown>
				</div>
			</div>
			<div className={props.smallcard ? `${Styles.hover_text} ${Styles.small_card}` : Styles.hover_text}>
				<div className={Styles.hover_header}>
					{props.card?.card?.Difficulty &&
						<span className={Styles.difficulty}>
							{props.card?.card?.Difficulty}
						</span>
					}
					<span className={Styles.live}>{props.card?.card?.Live}</span>
				</div>
				<div className={Styles.card_content}>
					<div className={Styles.heading}>
						{props?.card?.card?.name?.tag ? (
							<CreateHeading
								tag={props?.card?.card?.name.tag}
								children={{ className: `${Styles.name} h6` }}
								text={props?.card?.card?.name?.text}
							/>
						) : (
							<h6 className={`${Styles.name} h6`}>
								{props.card?.card?.name?.text}
							</h6>
						)}
						<Image
							src={
								isMobile
									? props.card?.card?.Course_logo?.mobile_image?.data
										?.attributes?.url
									: props.card?.card?.Course_logo?.mobile_image?.data
										?.attributes?.url
							}
							height={49.77}
							width={55}
							alt={
								isMobile
									? props.card?.card?.Course_logo?.mobile_image?.data
										?.attributes?.alternativeText
									: props.card?.card?.Course_logo?.mobile_image?.data
										?.attributes?.alternativeText
							}
							style={{ objectFit: "contain" }}
						/>
					</div>
					{isMobile && (
						<div className={Styles.desc}>
							<p className={`${Styles.para} p`}>{props.card?.card?.Desc.substring(0, 60)}...</p>
						</div>
					)}
				</div>
				<div className={Styles.labels}>
					{props.card?.card?.Course_points?.map((item: any, index: number) => {
						return (
							<span
								key={index}
								className={Styles.label}
							>
								<Image
									src={item?.Icon?.data?.attributes?.url}
									height={8}
									width={8}
									alt={item?.Icon?.data?.attributes?.alternativeText}
								/>

								{item?.Text}
							</span>
						);
					})}
				</div>
				<div className={Styles.reviews}>
					<span>
						{props.card?.card?.Review_icons?.data.map(
							(icon: any, index: number) => {
								return (
									<Image
										src={icon?.attributes?.url}
										key={index}
										height={9}
										width={9}
										alt={icon?.attributes?.alternativeText}
										className={Styles.logo_icon}
									/>
								);
							}
						)}
					</span>
					<p className="p"> {props.card?.card?.Total_reviews} Reviews</p>
				</div>
				{!isMobile && (
					<Link href={`/courses/${props?.card?.slug}/schedule`}>
						<span className={Styles.view}> View Online Training Schedule</span>
					</Link>
				)}
				<Link href={`/courses/${props?.card?.slug}`}>
					<button className={Styles.view_btn}>
						View Program
						<Image
							src={"/Mask group.svg"}
							height={20}
							width={20}
							alt="icon"
						/>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default CourseCard;
