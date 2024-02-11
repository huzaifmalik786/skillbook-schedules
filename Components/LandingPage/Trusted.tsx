import React, { useState } from "react";
import Styles from "../../styles/components/homepage/trusted.module.scss";
import MultiCarousel from "../Carousel";
import Image from "next/image";
import { ButtonType, Heading_type, TestimonialCardType } from "../../interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateHeading from "../CreateHeading";
import { useScreenDimensions } from "use-screen-dimensions";
import ViewportWrapper from "../ViewportWrapper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  color?: string;
  homepage: boolean;
  setShowMore?: any;
  setActiveTest?: any
  data: {
    heading: Heading_type;
    stats_heading_tag: string;
    Desc: string;
    Stats: {
      Name: string;
      Num: string;
    }[];
    testimonial_cards: {
      data: TestimonialCardType[];
    }
    Button: ButtonType;
    scroll_id?: string;
  }
};

const Trusted = (props: Props) => {
  const { pathname } = useRouter();
  const { width } = useScreenDimensions();
  const isMobile = width < 950;
  const handleOpen = (review: any) => {
    props.setActiveTest(review)
    props.setShowMore(true);
  }

  const divideValue = width < 1180 ? width < 700 ? width < 650 ? 5 : 12 : 11 : 10

  return (
    <ViewportWrapper ids="" bgcolor={pathname === "/" ? "" : "#F4FDF8"}>

      <div
        id={props?.data?.scroll_id || ""}
        className={Styles.trusted_wrapper}
      >
        <div className={Styles.text_content}>
          <div className={Styles.text_left}>
            {props?.data?.heading?.tag ? (
              <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h3` }} text={props?.data?.heading?.text} />
            ) : (
              <h3 className={`${Styles.heading} h3`}>{props.data?.heading?.text}</h3>
            )}

            <ReactMarkdown className={`${Styles.desc} p`}>
              {props?.data?.Desc
              }
            </ReactMarkdown>
          </div>

          <div className={Styles.text_right}>
            {(props.data?.Stats)?.map((stat, index) => {
              return (
                <div key={index} className={Styles.stats}>
                  {props?.data?.stats_heading_tag ? (
                    <CreateHeading tag={props.data.stats_heading_tag} children={{ className: `${Styles.num} h3` }} text={stat.Num} />
                  ) : (
                    <h3 className={`${Styles.num} h3`}>
                      {stat.Num}
                    </h3>
                  )}

                  <p className={`${Styles.text} p`}>{stat.Name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={Styles.reviews_carousel}>
          <MultiCarousel slides={2} autoPlay={false} dots={true} buttons={true}>
            {(props?.data?.testimonial_cards?.data)?.map((review, index) => {
              return (
                <div key={index} className={Styles.review}>
                  <div className={Styles.review_profile}>
                    <Image
                      src={isMobile ? review?.attributes?.image?.mobile_image?.data?.attributes?.url : review?.attributes?.image?.desktop_image?.data?.attributes?.url}
                      alt={isMobile ? review?.attributes?.image?.mobile_image?.data?.attributes?.alternativeText : review?.attributes?.image?.desktop_image?.data?.attributes?.alternativeText}
                      height={66}
                      width={78}
                      style={{ objectFit: "contain" }}
                    />
                    <div className={Styles.profile}>
                      {review?.attributes?.name?.tag ? (
                        <CreateHeading tag={review?.attributes?.name?.tag} children={{ className: `${Styles.user_name} h4` }} text={review?.attributes?.name?.text} />
                      ) : (
                        <h4 className={`${Styles.user_name} h4`}>{review?.attributes?.name?.text}</h4>
                      )}
                      <div className={Styles.rating}>
                        <Image
                          src={review?.attributes?.Platform_logo?.data?.attributes?.url}
                          alt={review?.attributes?.Platform_logo?.data?.attributes?.alternativeText}
                          height={14}
                          width={14}
                        />

                        <span>
                          <Image
                            src={"/rating_star.svg"}
                            alt="rating"
                            height={14}
                            width={14}
                          />
                          {review.attributes?.Rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.review_text}>
                    <ReactMarkdown className="p" rehypePlugins={[rehypeRaw]}>{review?.attributes?.Description?.length <= (width * 2) / divideValue ? review?.attributes?.Description : `${review?.attributes.Description.substring(0, (width * 2) / divideValue)}...`}</ReactMarkdown>

                  </div>
                  <button className={Styles.read_more} onClick={() => handleOpen(review)} style={review?.attributes?.Description?.length <= (width * 2) / divideValue ? { display: "none" } : {}}>Read More</button>

                </div>
              );
            })}
          </MultiCarousel>
        </div>
        {props.data?.Button &&
          <div className={Styles.read_all}>
            <Link href={props.data?.Button?.href || "#"}>
              <button>{props.data?.Button?.DisplayName}
              </button>
            </Link>

            <Link href={props.data?.Button?.href || "#"}>
              <Image
                className={Styles.DropDown}
                src={"/right-arrow.svg"}
                width={18}
                height={18}
                alt="read more"
              />
            </Link>

          </div>

        }
      </div>
    </ViewportWrapper>
  );
};

export default Trusted;
