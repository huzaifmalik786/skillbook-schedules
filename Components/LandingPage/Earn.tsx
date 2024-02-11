import Styles from "../../styles/components/landingPage/Earn.module.scss";
import Image from "next/image";
import ViewportWrapper from "../ViewportWrapper";
import { HeadingType, Heading_type, image_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";

type Props = {
  data: {
    heading: Heading_type;
    scroll_id?: string;
  };
  cards: {
    image: image_type;
    desc: string;
  }[]
}

export default function Earn(props: Props) {
  // console.log(props.cards)
  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor="#f3f3f3">
      <div className={Styles.Earn}>
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
        )}

        <div className={Styles.cards}>
          {props?.cards?.map((card, index) => {
            return (
              <div className={Styles.card} key={index}>
                <div className={Styles.img}>
                  <Image
                    src={card?.image?.data?.attributes?.url}
                    alt={card?.image?.data?.attributes?.alternativeText}
                    width={40}
                    height={40}
                  />
                </div>
                <div className={Styles.content}>
                  <p className={`${Styles.highlighted_heading} p`} dangerouslySetInnerHTML={{ __html: card?.desc }}></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ViewportWrapper>
  );
}
