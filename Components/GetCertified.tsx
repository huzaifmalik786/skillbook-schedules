import React from "react";
import Image from "next/image";
import Styles from "../styles/components/getcertified.module.scss";
import ViewportWrapper from "./ViewportWrapper";
import MultiCarousel from "./Carousel";
import { useScreenDimensions } from "use-screen-dimensions";
import { useRouter } from "next/router";
import { CertificationCardType, HeadingType2 } from "../interfaces/interfaces";
import Link from "next/link";
import CreateHeading from "./CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
	isHomepage?: boolean;
	color: string;
	data: {
		Heading: HeadingType2;
		Button: {
			DisplayName: string;
			href: string;
		};
		Certification_Card: CertificationCardType[];
		scroll_id?: string;
	};
};

const GetCertified = (props: Props) => {
	const { width } = useScreenDimensions();
	const { pathname } = useRouter();

	const isMobile = width < 950;

	return (
		<ViewportWrapper
			ids={props?.data?.scroll_id || "view"}
			bgcolor={props.color}
		>
			<div
				className={Styles.certified_wrapper}
				style={{ backgroundColor: props.color }}
			>
				<div className={Styles.explore_courses}>
					{props.isHomepage ? (
						<>
							{props?.data?.Heading?.heading_tag ? (
								<CreateHeading
									tag={props?.data?.Heading?.heading_tag}
									children={{ className: `${Styles.explore_heading} h3` }}
									text={props?.data?.Heading?.Heading}
								/>
							) : (
								<h3 className={`${Styles.explore_heading} h3`}>
									{props?.data?.Heading?.Heading}
								</h3>
							)}
						</>
					) : (
						<>
							{props?.data?.Heading?.heading_tag ? (
								<CreateHeading
									tag={props?.data?.Heading?.heading_tag}
									children={{ className: `${Styles.explore_heading} h4` }}
									text={props?.data?.Heading?.Heading}
								/>
							) : (
								<h4 className={`${Styles.explore_heading} h4`}>
									{props?.data?.Heading?.Heading}
								</h4>
							)}
						</>
					)}
					<ReactMarkdown
						className={`${Styles.explore_subheading} p`}
						rehypePlugins={[rehypeRaw]}
					>
						{props?.data?.Heading?.Desc}
					</ReactMarkdown>
					{!isMobile && (
						<Link href={props?.data?.Button?.href || "#"}>
							<button className={Styles.explore_btn}>
								{props?.data?.Button?.DisplayName}
							</button>
						</Link>
					)}
				</div>

				{!isMobile ? (
					<div className={Styles.cards_wrapper}>
						{props?.data?.Certification_Card?.map((card, index) => {
							return (
								<div
									className={Styles.card}
									key={index}
								>
									<div
										style={{
											width: "100%",
											height: "50px",
											position: "relative",
										}}
									>
										<Image
											src={card?.University_logo?.data?.attributes?.url}
											alt={card?.University_logo?.data?.attributes?.alternativeText}
											fill
											style={{
												objectFit: "contain", // cover, contain, none
											}}
										/>
									</div>
									<div
										style={{
											width: "100%",
											height: "90px",
											position: "relative",
										}}
									>
										<Image
											src={card?.Certi_logo?.data?.attributes?.url}
											alt={card?.Certi_logo?.data?.attributes?.alternativeText}
											fill
											style={{
												objectFit: "contain", // cover, contain, none
											}}
										/>
									</div>
									<p className={`${Styles.card_desc} p`}>{card.Desc}</p>
								</div>
							);
						})}
					</div>
				) : (
					props?.data?.Certification_Card && (
						<MultiCarousel
							slides={1}
							autoPlay={false}
							dots={true}
							buttons={true}
						>
							{props.data.Certification_Card.map((card, index) => {
								return (
									<div
										className={Styles.cards_wrapper}
										key={index}
									>
										<div className={Styles.card}>
											<Image
												src={card.University_logo?.data?.attributes?.url}
												alt={card?.University_logo?.data?.attributes?.alternativeText}
												height={51}
												width={195}
												style={{objectFit:"contain"}}
											/>
											<Image
												src={card.Certi_logo?.data?.attributes?.url}
												alt={card?.Certi_logo?.data?.attributes?.alternativeText}
												height={93}
												width={93}
												style={{objectFit:"contain"}}
											/>
											<ReactMarkdown
												className={`${Styles.card_desc} p`}
												rehypePlugins={[rehypeRaw]}
											>
												{card.Desc}
											</ReactMarkdown>
										</div>
									</div>
								);
							})}
						</MultiCarousel>
					)
				)}
				{isMobile && pathname !== "/corporate" && (
					<Link href={props?.data?.Button?.href || "#"}>
						<button className={Styles.explore_btn}>
							{props?.data?.Button?.DisplayName}
						</button>
					</Link>
				)}
			</div>
		</ViewportWrapper>
	);
};

export default GetCertified;
