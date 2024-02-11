import React from "react";
import Styles from "../../styles/components/landingPage/CsDetails.module.scss";
import Image from "next/image";
import { HeadingType, HeadingType2, Heading_type, image_type, images } from "../../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  data: {
    heading: HeadingType2;
    image: images;
    highlighted_heading: Heading_type;
    sub_text: Heading_type;
    scroll_id?: string;
  }
}

export default function Cs_details(props: Props) {
  const { width } = useScreenDimensions();
  const isMobile = width < 950
  return (
    <div className={Styles.cs_div} id={props?.data?.scroll_id || "Overview"}>
      <div className={Styles.cs_details}>
        {props?.data?.heading?.heading_tag ? (
          <CreateHeading tag={props.data.heading.heading_tag} children={{ className: Styles.cs_desc_title }} text={props?.data?.heading?.Heading} />
        ) : (
          <div className={Styles.cs_desc_title}>{props?.data?.heading?.Heading}</div>

        )}
        <ReactMarkdown className={Styles.cs_desc} rehypePlugins={[rehypeRaw]}>
          {props?.data?.heading?.Desc}
        </ReactMarkdown>
      </div>
      <div className={Styles.bar}>
        <Image alt={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.alternativeText : props?.data?.image?.desktop_image?.data?.attributes?.alternativeText} className={Styles.bar_img} src={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.url : props?.data?.image?.desktop_image?.data?.attributes?.url} width={100} height={100} />
        <div>
          {props?.data?.highlighted_heading?.tag ? (
            <CreateHeading tag={props?.data?.highlighted_heading?.tag} children={{ className: `${Styles.line_1} h4`, dangerouslySetInnerHTML: { __html: props?.data?.highlighted_heading?.text } }} />
          ) : (
            <h4 className={`${Styles.line_1} h4`} dangerouslySetInnerHTML={{ __html: props?.data?.highlighted_heading?.text }}></h4>
          )}
          {props?.data?.sub_text?.tag ? (
            <CreateHeading tag={props.data.sub_text.tag} children={{ className: Styles.line_2 }} text={props?.data?.sub_text?.text} />
          ) : (
            <div className={Styles.line_2}>{props?.data?.sub_text?.text}</div>
          )}
        </div>
      </div>
    </div>
  );
}
