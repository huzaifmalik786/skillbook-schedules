import React from "react";
import Image from "next/image";

import Styles from "../../styles/components/instructors/coacheshero.module.scss";
import ViewportWrapper from "../ViewportWrapper";
import { HeadingType, Heading_type, image_type, images } from "../../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "../CreateHeading";

type Props = {
  data: {
    heading_badge: Heading_type
    image: images;
    highlighted_heading: Heading_type
  }
};

const CoachesHero = (props: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 950
  return (
    <ViewportWrapper ids="" bgcolor="#000">
      <div className={Styles.coaches_hero}>
        <div className={Styles.left}>
          {props?.data?.heading_badge?.tag ? (
            <CreateHeading tag={props?.data?.heading_badge?.tag} children={{ className: `${Styles.label} p` }} text={props?.data?.heading_badge?.text} />
          ) : (
            <p className={`${Styles.label} p`}>{props?.data?.heading_badge?.text || "Our Instructors"}</p>
          )}

          {props?.data?.highlighted_heading?.tag ? (
            <CreateHeading tag={props.data.highlighted_heading.tag} children={{ className: `${Styles.heading} h3`, dangerouslySetInnerHTML: { __html: props?.data?.highlighted_heading?.text } }} />
          ) : (
            <h3 className={`${Styles.heading} h3`} dangerouslySetInnerHTML={{ __html: props?.data?.highlighted_heading?.text }}></h3>
          )}
        </div>
        <div className={Styles.vector_art}>
          <Image
            src={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.url : props?.data?.image?.desktop_image?.data?.attributes?.url}
            height={197}
            width={262}
            alt={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.alternativeText : props?.data?.image?.desktop_image?.data?.attributes?.alternativeText}
            priority
          />
        </div>
      </div>
    </ViewportWrapper>
  );
};

export default CoachesHero;
