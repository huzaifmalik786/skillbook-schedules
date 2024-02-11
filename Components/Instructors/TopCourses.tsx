import React, { useEffect, useState } from "react";
import Styles from "../../styles/components/instructors/topcourses.module.scss";

import { CourseCardType, Heading_type } from "../../interfaces/interfaces";
import CourseCard from "../CourseCard";
import ViewportWrapper from "../ViewportWrapper";
import { useScreenDimensions } from "use-screen-dimensions";
import MultiCarousel from "../Carousel";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Scrollbar, FreeMode, Mousewheel } from "swiper";
import CreateHeading from "../CreateHeading";

type Props = {
  data: {
    heading: Heading_type;
    courses: {
      data: {
        id: number;
        attributes: CourseCardType;
      }[];
    }
  }
  filter: string
};

const chunkArray = (array: any, size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const TopCourses = (props: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 550;
  const [filteredData, setFilteredData] = useState(
    props?.data.courses.data?.filter((i) => {
      return i?.attributes?.card?.course_categories?.data?.find(i => i.attributes.category == props.filter)
    }) || []
  );

  useEffect(() => {
    setFilteredData(
      props?.data?.courses?.data?.filter((i) => {
        return i?.attributes?.card?.course_categories?.data?.find(i => i.attributes.category == props.filter)
      }) || []
    );
  }, [props.filter]);



  const itemChunks = chunkArray(filteredData, isMobile ? 1 : 4);

  return (
    <ViewportWrapper ids="" bgcolor="#ffeeda">
      <div className={Styles.top_courses}>
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props?.data?.heading?.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text || "Top Courses"}</h4>

        )}
        <div className={Styles.swiper}>
          <Swiper
            direction={"vertical"}
            scrollbar={{
              hide: false,
              draggable: true,
              verticalClass: Styles.vertical,
            }}
            modules={[Scrollbar, FreeMode, Mousewheel]}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            mousewheel={{
              releaseOnEdges: true,
            }}
            // centeredSlides
            slidesPerView={"auto"}
            className={Styles.swiper}
          >
            {itemChunks.map((chunk, index) => (
              <SwiperSlide key={index}>
                <div className={Styles.row}>
                  {chunk.map((item: any, index: number) => (
                    <CourseCard card={item?.attributes} key={index} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={Styles.carousel}>
          <MultiCarousel
            slides={2}
            mobile={isMobile? width< 350? 1: 1.3: 2}
            autoPlay={false}
            dots={true}
            buttons={true}
            infinite="false"
          >
            {filteredData?.map((item, index) => {
              return (
                <CourseCard card={item?.attributes} key={index} smallcard/>
              )
            })}

          </MultiCarousel>
        </div>
      </div>
    </ViewportWrapper>
  );
};

export default TopCourses;
