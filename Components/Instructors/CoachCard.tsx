import React from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "../../styles/components/instructors/coachescard.module.scss";
import { CoachCardType } from "../../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "../CreateHeading";

type Props = {
  card: CoachCardType;
  slug?: string;
  buttons: {
    read_more_btn: string;
    view_schedule_btn: string;
  }
  showbtn?: boolean
};

const CoachCard = (props: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 950
  return (
    <div className={Styles.coach_card}>
      <Image
        key={props?.card?.images?.id}
        src={isMobile ? props.card?.images?.mobile_image?.data?.attributes?.url : props?.card?.images?.desktop_image?.data?.attributes?.url}
        height={269}
        width={302}
        alt={isMobile ? props.card?.images?.mobile_image?.data?.attributes?.alternativeText : props?.card?.images?.desktop_image?.data?.attributes?.alternativeText}
        className={Styles.coach_img}
      />
      <div className={Styles.coach_details}>
        {props?.card?.name?.tag ? (
          <CreateHeading tag={props?.card?.name.tag} children={{ className: `${Styles.name} h6` }} text={props?.card?.name?.text} />
        ) : (
          <h6 className={`${Styles.name} h6`}>{props.card?.name?.text}</h6>
        )}
        {props?.card?.position?.tag ? (
          <CreateHeading tag={props?.card?.position.tag} children={{ className: `${Styles.position} p` }} text={props?.card?.position?.text} />
        ) : (
          <p className={`${Styles.position} p`}>{props.card?.position?.text}</p>

        )}
        <div className={Styles.buttons}>
          <Link href={`/instructors/${props.slug}`}>
            <button>{props?.buttons?.read_more_btn}</button>
          </Link>
          {props.showbtn &&
            <Link href={`/instructors/${props.slug}?section=schedules`}>
              <button className={Styles.view_btn}>{props?.buttons?.view_schedule_btn}</button>
            </Link>
          }

        </div>

      </div>
    </div>
  );
};

export default CoachCard;
