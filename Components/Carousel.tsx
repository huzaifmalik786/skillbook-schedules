import React from "react";
import Image from "next/image";
import Styles from "../styles/components/carousel.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const CustomDot = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  } = rest;
  const carouselItems = [1, 2, 3, 4, 5];

  return (
    <button
      className={active ? Styles.active : Styles.inactive}
      onClick={() => onClick()}
    >
      <p />
    </button>
  );
};

const ButtonGroup = ({ next, previous, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className={Styles.button_group}>
      <button onClick={() => previous()} className={Styles.prev}>
        <Image src={"/prev.svg"} height={8.75} width={4.38} alt="prev" />
      </button>

      <button onClick={() => next()} className={Styles.next}>
        <Image src={"/next.svg"} height={8.75} width={4.38} alt="next" />
      </button>
    </div>
  );
};

const MultiCarousel = ({
  children,
  slides,
  autoPlay,
  dots,
  buttons,
  slidesToShow,
  mobile,
  customAnimation,
  slidesToSlide,
  infinite,
  autoPlaySpeed,
  partialVisbile,
  key
}: any) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 950 },
      items: slides || 1,
      slidesToSlide: slidesToSlide || 2,
      partialVisibilityGutter: partialVisbile || 0
    },
    tablet: {
      breakpoint: { max: 949, min: 540 },
      items: slidesToShow || 2,
      slidesToSlide: slidesToSlide || 1,
      partialVisibilityGutter: partialVisbile || 0
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: mobile || 1,
      slidesToSlide: 1,
      partialVisibilityGutter: partialVisbile || 0
    },
  };

  return (
    <Carousel
      swipeable
      key={key}
      draggable
      showDots={dots}
      responsive={responsive}
      autoPlay={autoPlay}
      ssr
      partialVisbile
      infinite={infinite=="false"? false : true}
      containerClass={Styles.carousel}
      itemClass={Styles.item}
      arrows={false}
      autoPlaySpeed={autoPlaySpeed || 1200}
      keyBoardControl={true}
      customTransition={customAnimation}
      transitionDuration={500}
      customDot={<CustomDot />}
      customButtonGroup={buttons ? <ButtonGroup /> : <></>}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
