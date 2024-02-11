import { useEffect, useState } from "react";
import Styles from "../../styles/components/landingPage/Attend.module.scss";
import ViewportWrapper from "../ViewportWrapper";
import { useScreenDimensions } from "use-screen-dimensions";
import { ButtonType, HeadingType2 } from "../../interfaces/interfaces";
import Link from "next/link";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  data: {
    heading: HeadingType2;
    button: ButtonType;
    tags: {
      heading: string;
    }[]
    scroll_id?: string;
  }
}

export default function Attend(props: Props) {
  const { width, height } = useScreenDimensions();

  const isMobile = width < 950;

  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor="#27282c">
      <section className={Styles.Attend}>
        <div className={Styles.left}>
          {props?.data?.heading?.heading_tag ? (
            <CreateHeading tag={props.data.heading.heading_tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.Heading} />
          ) : (
            <h4 className={`${Styles.heading} h4`}>{props.data?.heading?.Heading || "Who should attend"}</h4>
          )}
          <ReactMarkdown className={`${Styles.course_desc} p`} rehypePlugins={[rehypeRaw]}>
            {props?.data?.heading?.Desc}
            {/* This course is ideal for any individual who wants to succeed in
            scrum, such as but not limited to the roles listed below */}
          </ReactMarkdown>

          {!isMobile && (
            <Link href={props?.data?.button?.href || "#"}>
              <button className={Styles.register_button}>{props?.data?.button?.DisplayName || "Register Now"}</button>
            </Link>
          )}
        </div>

        <div className={Styles.right}>
          <div className={Styles.card_section}>
            <div className={Styles.cards}>
              {props?.data?.tags?.map((text, index) => {
                return (
                  <div className={Styles.card} key={index}>
                    {text.heading}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isMobile && (
          <Link href={props?.data?.button?.href || "#"}>
            <button className={Styles.register_button}>{props?.data?.button?.DisplayName || "Register Now"}</button>
          </Link>
        )}
      </section>
    </ViewportWrapper>
  );
}
