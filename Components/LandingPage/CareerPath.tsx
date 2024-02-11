import Styles from "../../styles/components/landingPage/CareerPath.module.scss";
import Image from "next/image";
import ViewportWrapper from "../ViewportWrapper";
import { useEffect, useState } from "react";
import { useScreenDimensions } from "use-screen-dimensions";
import { ButtonType, HeadingType2, Heading_type, image_type, images } from "../../interfaces/interfaces";
import Link from "next/link";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
type Props = {
  data: {
    heading_badge: Heading_type;
    heading: HeadingType2;
    points: {
      Item: string;
    }[]
    button: ButtonType;
    image: images;
    scroll_id?: string;
  }
}

export default function CareerPath(props: Props) {
  const { width, height } = useScreenDimensions();

  const isMobile = width < 950;

  return (
    <ViewportWrapper ids="" bgcolor="#f4fdf8">
      <div className={Styles.CareerPath} id={props?.data?.scroll_id || "Career"}>
        <div className={Styles.left}>
          <div className={Styles.text}>
            {props?.data?.heading_badge?.tag ? (
              <CreateHeading tag={props.data.heading_badge.tag} children={{ className: `${Styles.title} p` }} text={props?.data?.heading_badge?.text} />
            ) : (
              <p className={`${Styles.title} p`}>{props?.data?.heading_badge?.text}</p>


            )}

            {props?.data?.heading?.heading_tag ? (
              <CreateHeading tag={props.data.heading.heading_tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.Heading} />
            ) : (
            <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.Heading}</h4>

            )}

            <ReactMarkdown className="p" rehypePlugins={[rehypeRaw]}>
              {props?.data?.heading?.Desc}
              {/* Scrum framework believes in ‘self-organization’. Making a career
              in Scrum as a Scrum Master will help an individual */}
            </ReactMarkdown>
            <div className={Styles.path_list}>
              {props?.data?.points?.map((path, index) => {
                return (
                  <div key={index} className={Styles.path}>
                    <span className={Styles.check}>
                      <Image
                        src={"/check.svg"}
                        height={7.31}
                        width={9.59}
                        alt="check"
                      />
                    </span>
                    <p className="p">{path.Item}</p>
                  </div>
                );
              })}
              {/* {!isMobile && (
                <Link href={props?.data?.button?.href || "#"}>
                  <button type="submit" className={Styles.button}>
                    {props?.data?.button?.DisplayName}
                  </button>
                </Link>
              )} */}
            </div>
          </div>
        </div>
        <div className={Styles.right}>
          <Image
            src={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.url : props?.data?.image?.desktop_image?.data?.attributes?.url}
            width={682}
            height={351}
            style={{objectFit:"contain"}}
            alt={isMobile ? props?.data?.image?.mobile_image?.data?.attributes?.alternativeText : props?.data?.image?.desktop_image?.data?.attributes?.alternativeText}
          />
        </div>
      </div>
    </ViewportWrapper>
  );
}
