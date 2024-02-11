import React from "react";
import Image from "next/image";
import Styles from "../../styles/components/schedule/ScheduleRating.module.scss";
import { Rating } from "react-simple-star-rating";
import Reviews from "../Rating";
import { HeadingType2, ReviewType, image_type, image_type2 } from "../../interfaces/interfaces";

type Props = {
  data: {
    description: string
    reviews: ReviewType[];
    icons: {
      data: image_type2[];
    }
  }
};

const AllReviews = [
  {
    number: "2,900",
    rating: 4.9,
    platform: "/google-logo.svg",
    color: " #5893F6",
  },

  {
    number: "2,900",
    rating: 4.9,
    platform: "/trustpilot.svg",
    color: "#51B37F",
  },
];

const ScheduleRating = (props: Props) => {
  return (
    <div className={Styles.ScheduleRating}  >
      <Reviews data={props?.data?.reviews} />
      <div className={Styles.companyLogos} >
        {props?.data?.icons?.data?.map((icon, index) => {
          return (
            <Image
              key={index}
              alt={icon?.attributes?.alternativeText}
              src={icon?.attributes?.url}
              width={130}
              height={42}
            />
          )
        })}
      </div>
      <p className="p">
        {props?.data?.description}
      </p>
    </div>
  );
};

export default ScheduleRating;
