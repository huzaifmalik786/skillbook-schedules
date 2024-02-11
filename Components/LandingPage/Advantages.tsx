import Image from "next/image";
import Styles from "../../styles/components/landingPage/Advantages.module.scss";
import { HeadingType2, Heading_type, cardType } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  data: {
    heading: Heading_type;
    heading_badge: Heading_type
    Points: cardType[];
    scroll_id?: string;
    point_heading_tag: string;
  }
}

export default function Advantages(props: Props) {

  return (
    <section className={Styles.skill} id={props?.data?.scroll_id || "WhySkillbook"}>
      {props?.data?.heading_badge?.tag ? (
        <CreateHeading tag={props?.data?.heading_badge?.tag} children={{ className: `${Styles.heading_badge} p` }} text={props?.data?.heading_badge?.text} />
      ) : (
        <p className={`${Styles.heading_badge} p`}>{props?.data?.heading_badge?.text }</p>
      )}
      {props?.data?.heading?.tag ? (
        <CreateHeading tag={props?.data?.heading?.tag} children={{ className: `${Styles.heading} p` }} text={props?.data?.heading?.text} />
      ) : (
        <h4 className={`${Styles.heading} p`}>{props?.data?.heading?.text}</h4>
      )}

      <div className={Styles.tiles}>
        {props?.data?.Points?.map((advantage, index) => {
          return (
            <div className={Styles.tile} key={index}>
              <div className={Styles.img_sec}>
                <Image
                  alt={advantage.icon?.data?.attributes?.alternativeText}
                  width={39}
                  height={39}
                  className={Styles.img}
                  src={advantage.icon?.data?.attributes?.url}
                />
              </div>
              <div className={Styles.text_sec}>
              {props?.data?.point_heading_tag ? (
                    <CreateHeading tag={props.data?.point_heading_tag} children={{ className: Styles.tile_heading }} text={advantage?.Heading} />
                  ) : (
                    <div className={Styles.tile_heading}>
                      {advantage?.Heading}
                    </div>
                  )}
                <ReactMarkdown className={Styles.tile_desc}  rehypePlugins={[rehypeRaw]}>{advantage.Desc}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
