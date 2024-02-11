import { useState, useEffect } from "react";
import Image from "next/image";
import Styles from "../../styles/components/landingPage/LandingPageFeatures.module.scss";
import dynamic from "next/dynamic";
const VideoPlayer = dynamic(() => import("../LandingPage/VideoPlayer"), { ssr: false });
import { useScreenDimensions } from "use-screen-dimensions";
import { HeadingType2, ReviewType, image_type, image_type2 } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import Rating from "../Rating";


type Props = {
  schedule_id: number
  data: {
    heading: HeadingType2;
    video: image_type;
    video_course_logo: image_type;
    video_tag: string;
    video_thumbnail: image_type;
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
  }
}

const LandingPageFeatures = (props: Props) => {
  const [video, setVideo] = useState<boolean>(false);

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


  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setVideo(true);
  };

  const handleClose = () => {
    document.body.style.overflow = "unset";

    setVideo(false);
  };
  return (
    <div className={Styles.LandingPageFeatures}>
      {video && <VideoPlayer handleClose={handleClose} video={props?.data?.video} open={video} />}
      <div className={Styles.video_pts_wrapper}>
        <div className={Styles.video_container} onClick={handleOpen}>
          <Image
            src={props?.data?.video_thumbnail?.data?.attributes?.url}
            width={391}
            height={239}
            alt={props?.data?.video_thumbnail?.data?.attributes?.alternativeText}
            className={Styles.ad}
            priority
          />
          <Image src={"/video_play.svg"} height={69} width={69} alt="videoplay" className={Styles.play_btn} priority />
          <div className={Styles.feature}>
            {props?.data?.video_tag &&
              <span className={Styles.best_seller}>{props?.data?.video_tag}</span>
            }
          </div>
        </div>
        <div className={`${Styles.features} ${Styles.desktop}`}>
          {props?.data?.landing_page_features?.map((feature, index) => {
            return (
              <span key={index}>
                <Image
                  alt={feature?.Icon?.data?.attributes?.alternativeText}
                  className={Styles.icon}
                  src={feature?.Icon?.data?.attributes?.url}
                  width={17}
                  height={17}
                  priority
                />
                {feature?.Text}
              </span>
            )
          })}
        </div>
      </div>
      {(!loading && !(retail == 'null' && discount == 'null')) &&
        <div className={`${Styles.startingPrices} ${Styles.mobile}`}>
          <p className="p">
            Starting from <span className={Styles.strikeOut}>{retail}</span>
          </p>
          <p className={Styles.discount_price}>{discount}</p>
        </div>
      }
      <div className={Styles.desktop} style={{ marginBottom: "16px" }}>
        <Rating data={props.data?.reviews} />
      </div>
    </div>
  );
};
export default LandingPageFeatures;
