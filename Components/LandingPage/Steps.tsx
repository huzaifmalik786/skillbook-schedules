import Image from "next/image";

import Styles from "../../styles/components/landingPage/Steps.module.scss";
import { useScreenDimensions } from "use-screen-dimensions";
import { Heading_type, image_type, images } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";


type Props = {
  data: {
    heading_badge: Heading_type;
    heading: Heading_type;
    step: {
      normal_text: string;
      bold_text: string;
    }[];
    image: images;
    scroll_id?: string;
  }
}

export default function Steps(props: Props) {
  const { width } = useScreenDimensions();

  const isMobile = width < 950;

  return (
    <section className={Styles.Steps} id={props?.data?.scroll_id || "Certified"}>
      {!isMobile && (
        <Image
          alt={props?.data?.image?.desktop_image?.data?.attributes?.alternativeText}
          className={Styles.image}
          src={props?.data?.image?.desktop_image?.data?.attributes?.url}
          width={400}
          height={228}
        />
      )}
      <div className={Styles.content}>
        {props?.data?.heading_badge?.tag ? (
          <CreateHeading tag={props.data.heading_badge.tag} children={{ className: `${Styles.mini_heading} p` }} text={props?.data?.heading_badge?.text} />
        ) : (
          <p className={`${Styles.mini_heading} p`}>{props?.data?.heading_badge?.text}</p>
        )}
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
        )}
        {isMobile && (
          <Image
            alt={props?.data?.image?.mobile_image?.data?.attributes?.alternativeText}
            src={props?.data?.image?.mobile_image?.data?.attributes?.url}
            width={400}
            height={228}
          />
        )}
        <div className={Styles.points}>
          {props?.data?.step?.map((point, index) => {
            return (
              <div className={Styles.point} key={index}>
                <span className={Styles.bullet}>{index + 1}</span>
                <p className="p">
                  {point.normal_text}
                  <span> {point.bold_text}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
