import React from "react";
import Image from "next/image";
import Styles from "../styles/components/instructorscarousel.module.scss";
import MultiCarousel from "./Carousel";
import { InstructorCardType } from "../interfaces/interfaces";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";

import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "./CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  infinite?: string;
  slides: number;
  data: InstructorCardType[];
  mobile: Number
  showDots: boolean
  slidesToSlide? : number
  partialVisible?: number
};

const InstructorsCarousel = (props: Props) => {
  const { width} = useScreenDimensions();
  const isMobile = width < 950;

  return (
    <>
      {props?.data &&
        <MultiCarousel
          slides={props.slides}
          partialVisbile={width < 360? 0: props?.partialVisible}
          autoPlay={false}
          infinite={props?.infinite || "true"}
          slidesToSlide= {props.slidesToSlide}
          dots={props.showDots}
          buttons={true}
          mobile={width < 360 ? 1 : props.mobile}
        >
          {props?.data?.map((mentor, index) => {
            return (
              <div key={index} className={Styles.mentor_card}>
                <Image
                  src={isMobile ? mentor.attributes?.image?.mobile_image?.data?.attributes?.url : mentor.attributes?.image?.desktop_image?.data?.attributes?.url}
                  height={313}
                  width={306}
                  alt={isMobile ? mentor.attributes?.image?.mobile_image?.data?.attributes?.alternativeText : mentor.attributes?.image?.desktop_image?.data?.attributes?.alternativeText}
                  className={Styles.mentor_img}
                />
                <div className={Styles.mentor_text}>
                  {mentor?.attributes?.name?.tag ? (
                    <CreateHeading tag={mentor?.attributes?.name?.tag} children={{ className: `${Styles.mentor_name} h4` }} text={mentor?.attributes?.name?.text} />
                  ) : (
                    <h4 className={`${Styles.mentor_name} h4`}>{mentor.attributes?.name?.text}</h4>
                  )}
                  {mentor?.attributes?.position?.tag ? (
                    <CreateHeading tag={mentor?.attributes?.position?.tag} children={{ className: `${Styles.mentor_position} p` }} text={mentor?.attributes?.position?.text} />
                  ) : (
                    <p className={`${Styles.mentor_position} p`}> {mentor.attributes?.position?.text}</p>

                  )}
                  <div className={Styles.hover_text}>
                    <ReactMarkdown className={`${Styles.mentor_about} p`} rehypePlugins={[rehypeRaw]}>{mentor.attributes?.About}</ReactMarkdown>
                    <Link href={mentor?.attributes?.Social?.Link || "#"}>
                      <Image
                        src={mentor.attributes?.Social?.Image?.data?.attributes?.url}
                        alt={mentor.attributes?.Social?.Image?.data?.attributes?.alternativeText}
                        height={18}
                        width={18}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
          }
        </MultiCarousel>
      }
    </>
  );
};

export default InstructorsCarousel;
