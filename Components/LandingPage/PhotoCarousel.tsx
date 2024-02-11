import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Styles from "../../styles/components/landingPage/photocarousel.module.scss";

import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { image_type2, images } from "../../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";


type Props = {
  data: images[];
};



const PhotoCarousel = (props: Props) => {
  const data = props?.data
  const ref = useRef<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      ref.current?.goNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      {props?.data &&
        <ResponsiveContainer
          carouselRef={ref}
          render={(parentWidth, carouselRef) => {
            let currentVisibleSlide = 3;
            if (parentWidth <= 1440) currentVisibleSlide = 3;
            if (parentWidth <= 1080) currentVisibleSlide = 3;
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Card}
                // slideWidth={parentWidth < 800 ? parentWidth - 400 : 277.95}
                slideWidth={277.95}
                carouselWidth={parentWidth}
                data={data}
                currentVisibleSlide={currentVisibleSlide}
                maxVisibleSlide={5}
                useGrabCursor={false}
                fadeDistance={0.5}
                // customTransition="slide 0.5s forwards"
                transitionTime={1000}
                swipeThreshold={0.5}
                disableSwipe
              />
            );
          }}
        />}
    </div>
  );
};

export default PhotoCarousel;

// eslint-disable-next-line react/display-name
export const Card = React.memo(function (props: any) {
  const { data, dataIndex, isCenterSlide } = props;
  const { width } = useScreenDimensions();
  const isMobile = width < 950;

  const cover = isMobile ? data[dataIndex]?.mobile_image?.data?.attributes : data[dataIndex]?.desktop_image?.data?.attributes;
  return (
    <div className={Styles.card}>
      {cover &&
        <Image
          fill
          draggable={false}
          src={cover?.url}
          alt={cover?.alternativeText}
          className={Styles.card_img}
        />
      }

      <div className={!isCenterSlide ? Styles.overlay : ""} />
    </div>
  );
});
