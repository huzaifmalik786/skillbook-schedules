import React from "react";
import Image from "next/image";
import Styles from "../styles/components/coursefeatures.module.scss";
import { image_type } from "../interfaces/interfaces";

type Props = {
  data: {
      Text: string;
      Icon: image_type;
  }[]
};

const CourseFeatures = (props: Props) => {
  return (
    <div className={Styles.hero_pts}>
      {props?.data?.map((feature, index) => {
        return (
          <span key={index}>
            <Image
              alt={feature?.Icon?.data?.attributes?.alternativeText}
              className={Styles.icon}
              src={feature?.Icon?.data?.attributes?.url}
              width={17}
              height={17}
            />
            {feature?.Text}
          </span>
        );
      })}
    </div>
  );
};

export default CourseFeatures;
