import Image from "next/image";
import Rating from "../Rating";
import Styles from "../../styles/components/landingPage/Hero.module.scss";
import LandingPageFeatures from "./LandingPageFeatures";
import { ButtonType, HeadingType2, Heading_type, ReviewType, image_type, image_type2, images } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

type Props = {
  schedule_id: number;
  early_bird: {
    highlighted_heading: Heading_type;
    schedule_button: ButtonType;
    more_info_btn: ButtonType;
  }
  slug: string;
  data: {
    heading: HeadingType2;
    video: image_type;
    video_course_logo: image_type;
    video_tag: string;
    video_thumbnail: image_type
    points: {
      Text: string;
      Icon: image_type;
    }[]
    reviews: ReviewType[];
    landing_page_features: {
      Text: string;
      Icon: image_type;
    }[];
    original_price: string;
    discount_price: string;
    icons: {
      data: image_type2[];
    }
  };
  card: {
    Course_logo: images;
  }
};

const Ad = (props: Props) => {

  const { schedule, timezone } = useSelector((state: any) => state.schedule);
  const { data } = schedule;
  const { loading } = timezone;

  const [discount, setDisocunt] = useState(`${props?.data?.discount_price}`)
  const [retail, setRetail] = useState(`${props?.data?.original_price}`)

  useEffect(() => {
    const startingPrice = data[props?.schedule_id]?.starting;
    if (startingPrice) {
      setDisocunt(`${startingPrice.currency} ${startingPrice?.discount_price}`)
      setRetail(`${startingPrice.currency} ${startingPrice?.retail_price}`)
    }
  }, [loading, data])

  return (
    <div className={Styles.hero}>
      <div className={Styles.hero_left}>
        <div className={Styles.hero_main}>
          {props?.data?.heading?.heading_tag ? (
            <CreateHeading tag={props.data.heading.heading_tag} children={{ className: `${Styles.hero_title} h1` }} text={props?.data?.heading?.Heading} />
          ) : (
            <h1 className={`${Styles.hero_title} h1`}>
              {props?.data?.heading?.Heading}
            </h1>
          )}
          <ReactMarkdown className={`${Styles.hero_content} p`} rehypePlugins={[rehypeRaw]}>
            {props?.data?.heading?.Desc}
          </ReactMarkdown>
          <div className={Styles.hero_pts}>
            {props?.data?.points?.map((data, index) => {
              return (
                <span key={index}>
                  <Image
                    alt={data?.Icon?.data?.attributes?.alternativeText}
                    className={Styles.icon}
                    src={data?.Icon?.data?.attributes?.url}
                    width={17}
                    height={17}
                    priority
                  />
                  {data?.Text}
                </span>
              );
            })}
          </div>
          <div className={`${Styles.desktop} ${Styles.btn_wrapper}`}>
            <div className={Styles.early_bird}>
              {(!loading && !(retail == 'null' && discount == 'null')) &&
                <span className={Styles.startingPrices}>
                  <span className="p">
                    Starting from <span className={Styles.strikeOut}>{retail}</span>
                  </span>
                  <span className={Styles.discount_price}> {discount}</span>
                </span>
              }
              <Link href={`/courses/${props.slug}/schedule`}>
                <button>{props?.early_bird?.schedule_button?.DisplayName}</button>
              </Link>
            </div>
            <div className={Styles.img_wrapper}>
              {props.data?.icons?.data?.map((image, index) => {
                return (
                  <Image
                    key={index}
                    alt={image?.attributes?.alternativeText}
                    src={image?.attributes?.url}
                    width={191}
                    height={58}
                    priority
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className={`${Styles.rating_section} ${Styles.mobile}`}>
          <Rating data={props.data?.reviews} />
          <div className={Styles.img_wrapper}>
            {props.data?.icons?.data?.map((image, index) => {
              return (
                <Image
                  key={index}
                  alt={image?.attributes?.alternativeText}
                  src={image?.attributes?.url}
                  width={191}
                  height={58}
                  priority
                />
              )
            })}
          </div>
        </div>
      </div>

      <LandingPageFeatures data={props?.data} schedule_id={props.schedule_id} />
    </div>
  );
};
export default Ad;
