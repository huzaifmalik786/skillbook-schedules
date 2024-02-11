import React, { useEffect } from "react";
import Styles from "../styles/components/meetinstructors.module.scss";
import InstructorsCarousel from "./InstructorsCarousel";
import { useState } from "react";
import ViewportWrapper from "./ViewportWrapper";
import { ButtonType, CourseTagType, HeadingType2, InstructorCardType } from "../interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "./CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  color: string;
  filter?: boolean;
  data: {
    Heading: HeadingType2;
    Button: ButtonType;
    in_car: {
      data: InstructorCardType[];
    };
    course_filters: CourseTagType;
    scroll_id?: string;
  };
};

const MeetInstructors = (props: Props) => {
  // console.log(props?.data?.course_filters?.data.length)
  const { width} = useScreenDimensions();
  const isMobile = width < 950;
  const isTablet = (width > 950 && width < 1330)
  const [activeBtn, setActiveBtn] = useState(props?.data?.course_filters?.data[0]?.attributes?.category);
  const [filterData, setFilterData] = useState((props?.data?.in_car?.data)?.filter((i) => { return i?.attributes?.course_categories?.data?.find(i => i?.attributes?.category == activeBtn) }))
  useEffect(() => {
    activeBtn !== "" ?
      setFilterData((props?.data?.in_car?.data)?.filter((i) => { return i?.attributes?.course_categories?.data?.find(i => i?.attributes?.category == activeBtn) }))
      :
      setFilterData(props?.data?.in_car?.data)
  }, [activeBtn])
  const handleFilter = (index: string) => {
    setActiveBtn(index);
  };
  return (
    <ViewportWrapper ids={props?.data?.scroll_id} bgcolor={props.color}>
      <section
        className={Styles.meet_wrapper}
        style={{ backgroundColor: props.color }}
      >
        <div className={Styles.head_content}>
          {props?.data?.Heading?.heading_tag ? (
            <CreateHeading tag={props?.data?.Heading?.heading_tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.Heading?.Heading} />
          ) : (
            <h4 className={`${Styles.heading} h4`}>{props?.data?.Heading?.Heading}</h4>

          )}
          <ReactMarkdown className={`${Styles.sub_heading} p`} rehypePlugins={[rehypeRaw]}>{props?.data?.Heading?.Desc}</ReactMarkdown>
          {props.filter && (
            <div className={Styles.filter_btns}>
              {props?.data?.course_filters?.data?.map((item, index) => {
                return (
                  <button
                    onClick={() => handleFilter(item?.attributes?.category)}
                    key={index}
                    className={
                      activeBtn === item?.attributes?.category ? Styles.active_btn : Styles.btn
                    }
                  >
                    {item?.attributes?.category}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {props?.data?.course_filters?.data.length !== 0 ? (
          <InstructorsCarousel partialVisible={isTablet || width < 650? 100 : 0} slidesToSlide={isTablet? 2: 4} slides={isTablet ? 2 : 4} mobile={1} data={filterData} showDots={true} />
        ) : (
          <InstructorsCarousel partialVisible={isTablet || width < 650? 100 : 0} slidesToSlide={isTablet? 2: 4} slides={isTablet ? 2 : 4} mobile={1} data={props?.data?.in_car?.data} showDots={true} />
        )}
        {props?.data?.Button &&
          <div className={Styles.read_all}>
            <Link href={props.data.Button.href || ""}>
              <button>{props.data.Button.DisplayName}
                <Image src="/Vector 2 (Stroke).svg" width={12} height={18} alt="stroke" />
              </button>
            </Link>
          </div>
        }
      </section>
    </ViewportWrapper>
  );
};

export default MeetInstructors;