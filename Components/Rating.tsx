import React from "react";
import Image from "next/image";
import Styles from "../styles/components/reviews.module.scss";
import { Rating } from "react-simple-star-rating";
import { ReviewType, image_type } from "../interfaces/interfaces";

type Props = {
  color?: string;
  data: ReviewType[];
  wrapped?: boolean;
};

const Reviews = (props: Props) => {

  return (
    <div className={Styles.reviews} style={props.wrapped ? { flexWrap: "wrap" } : {}} >
      {props.data?.map((review: ReviewType, index: number) => {
        return (
          <div
            className={Styles.review}
            key={index}
            style={{ color: review.Color }}
          >
            <div className={Styles.numbers} style={{ color: review.Color }}>
              <p className="p" style={{ color: props.color, whiteSpace: "nowrap" }}>
                Based on {review.Reviews} reviews{" "}
              </p>
              <span style={{ color: review.Color }}>{review.Rating} </span>
            </div>
            <Rating
              initialValue={review?.Rating}
              readonly
              allowFraction
              size={17}
              fillColor={review.Color}
            />
            <Image
              src={review?.Platform_logo?.data?.attributes?.url}
              height={22.66}
              width={92.3}
              alt={review?.Platform_logo?.data?.attributes?.alternativeText}
              style={{ objectFit: "contain" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
