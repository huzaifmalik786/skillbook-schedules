import React from "react";
import Styles from "../../styles/components/landingPage/Topics.module.scss";
import Image from "next/image";
import ViewportWrapper from "../ViewportWrapper";
import { ButtonType, Heading_type, image_type } from "../../interfaces/interfaces";
import Link from "next/link";
import CreateHeading from "../CreateHeading";


type Props = {
  data: {
    heading_badge: Heading_type;
    heading: Heading_type;
    cards: {
      Text: string;
      Icon: image_type;
    }[]
    button: ButtonType;
    scroll_id?: string;
  }
}

export default function Topics(props: Props) {
  return (
    <ViewportWrapper ids="" bgcolor="#fff">
      <section className={Styles.topic} id={props?.data?.scroll_id || "Curriculum"}>
        {props?.data?.heading_badge?.tag ? (
          <CreateHeading tag={props.data.heading_badge.tag} children={{ className: `${Styles.curriculum_text} p` }} text={props?.data?.heading_badge?.text} />
        ) : (
          <p className={`${Styles.curriculum_text} p`}>{props?.data?.heading_badge?.text || "Curriculum"}</p>

        )}
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.topic_title} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.topic_title} h4`}>{props?.data?.heading?.text || "Topics covered"}</h4>

        )}
        <div className={Styles.topic_sec}>
          <div className={Styles.tiles_topic}>
            {props?.data?.cards?.map((tile, index) => {
              return (
                <div className={Styles.tile_topic} key={index}>
                  <span>
                    <Image
                      src={tile.Icon?.data?.attributes?.url}
                      width={51}
                      height={56}
                      alt={tile.Icon?.data?.attributes?.alternativeText}
                      className={Styles.img}
                    />
                    <div className={Styles.tile_text}>{tile.Text}</div>
                  </span>
                </div>
              );
            })}
          </div>
          <div className={Styles.curriculum}>
            <Link href={props?.data?.button?.href || "#"}>
              <p className="p">{props?.data?.button?.DisplayName}</p>
            </Link>
            <Image
              src={"/dowloadBlackVersion.svg"}
              width={27.5}
              height={27.5}
              alt="downloadImg"
            />
          </div>
        </div>
      </section>
    </ViewportWrapper>
  );
}
