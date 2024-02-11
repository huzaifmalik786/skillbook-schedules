import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Styles from "../styles/components/upskilling.module.scss";
import ViewportWrapper from "./ViewportWrapper";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { ButtonType, HeadingType2, image_type } from "../interfaces/interfaces";
import CreateHeading from "./CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  setData?: Function;
  data: {
    Heading: HeadingType2
    Button: ButtonType;
    icon: {
      original_icon: image_type;
      hover_icon: image_type;
    }[]
    scroll_id?: string;
  }
};

const UpSkilling = (props: Props) => {
  const [isHovering, setIsHovered] = useState(-1);
  const onMouseEnter = (index: number) => setIsHovered(index);
  const onMouseLeave = () => setIsHovered(-1);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: element,
      start: "top 100%",
      end: "bottom 100%",
      onEnter: () => props.setData?.(true),
      onEnterBack: () => props.setData?.(true),
      onLeaveBack: () => props.setData?.(false),
    });
  }, [props]);

  return (
    <ViewportWrapper ids={props?.data?.scroll_id || "up-skilling"} bgcolor="#0e3b65">
      <div className={Styles.upskill_wrapper} ref={ref}>
        <div className={Styles.upskill_left}>
          {props?.data?.Heading?.heading_tag ? (
            <CreateHeading tag={props.data.Heading.heading_tag} children={{ className: `${Styles.upskill_heading} h3` }} text={props?.data?.Heading?.Heading} />
          ) : (
            <h3 className={`${Styles.upskill_heading} h3`}>
              {props.data?.Heading?.Heading}
            </h3>
          )}

          <ReactMarkdown className={`${Styles.upskill_desc} p`} rehypePlugins={[rehypeRaw]}>
            {props.data?.Heading?.Desc}
          </ReactMarkdown>
          {props?.data?.Button &&
            <Link href={props.data?.Button?.href || "#"}>
              <button className={Styles.upskill_btn}>{props.data?.Button?.DisplayName}</button>
            </Link>
          }

        </div>
        <div className={Styles.icons_wrapper}>
          {props?.data?.icon?.map((logo, index) => {
            return (
              <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave}>
                {isHovering == index ? (
                  <Image
                    src={logo?.hover_icon?.data?.attributes?.url}
                    height={27}
                    width={100}
                    alt={logo?.hover_icon?.data?.attributes?.alternativeText}
                    className={Styles.logo}
                  />
                ) : (
                  <Image
                    src={logo?.original_icon?.data?.attributes?.url}
                    height={27}
                    width={100}
                    alt={logo?.original_icon?.data?.attributes?.alternativeText}
                    className={Styles.logo}
                  />
                )}

              </div>

            );
          })}
        </div>
      </div>
    </ViewportWrapper>
  );
};

export default UpSkilling;
