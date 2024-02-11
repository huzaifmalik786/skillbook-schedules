/* eslint-disable react/no-unescaped-entities */
import Styles from "../../styles/components/corporate/corporate_faq.module.scss";
import Questions from "../Questions";
import ViewportWrapper from "../ViewportWrapper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ButtonType, Heading_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { useScreenDimensions } from "use-screen-dimensions";
import Link from "next/link";



type Props = {
  label?: boolean;
  data: {
    highlighted_heading: Heading_type;
    Questions: {
      id: number;
      Ques: string;
      Answer: string;
    }[];
    scroll_id?: string;
    heading_badge: Heading_type;
  }
  early_bird?: {
    highlighted_heading: Heading_type;
    schedule_button: ButtonType;
    more_info_btn: ButtonType;
  }
  schedule_id?: number;
  slug?: string
};
export default function FAQ(props: Props) {
  const ref = useRef(null);
  const ctaref = useRef(null);

  const { schedule, timezone } = useSelector((state: any) => state.schedule);
  const { data } = schedule;
  const { loading } = timezone;

  const [price, setPrice] = useState<string>();

  useEffect(() => {
    if (props?.schedule_id) {
      const startingPrice = data[props?.schedule_id]?.starting;
      if (startingPrice) {
        setPrice(`${startingPrice.currency} ${startingPrice?.retail_price - startingPrice?.discount_price}`)
      }
    }
  }, [loading, data])

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ctaref.current,
      {
        position: "fixed",
        bottom: 0,
      },
      {
        position: "fixed",
        bottom: -200,
        scrollTrigger: {
          trigger: ".faq",
          start: "bottom bottom",
          end: 600,
          toggleActions: "play none none reverse",
        }
      }
    );
  }, [])

  return (
    <ViewportWrapper ids={props?.data?.scroll_id || "faq"} bgcolor="" >
      <div className={`${Styles.FAQ} faq`} ref={ref} id="faq">
        {props.label &&
          <>
            {props?.data?.heading_badge?.tag ? (
              <CreateHeading tag={props.data.heading_badge.tag} children={{ className: `${Styles.badge} p` }} text={props?.data?.heading_badge?.text} />
            ) : (
              <p className={`${Styles.badge} p`}>{props?.data?.heading_badge?.text}</p>


            )}
          </>
        }

        {props?.data?.highlighted_heading?.tag ? (
          <CreateHeading tag={props?.data?.highlighted_heading?.tag} children={{ className: `${Styles.highlighted_heading} h4`, dangerouslySetInnerHTML: { __html: props?.data?.highlighted_heading?.text } }} />
        ) : (
          <h4 className={`${Styles.highlighted_heading} h4`} dangerouslySetInnerHTML={{ __html: props?.data?.highlighted_heading?.text }}></h4>
        )}

        <Questions data={props?.data?.Questions} />

        {props?.slug &&
          <div className={Styles.cta_wrapper}>
            <div className={Styles.early_bid} ref={ctaref}>
              {price &&
                <>
                  {props?.early_bird?.highlighted_heading?.tag ? (
                    <CreateHeading tag={props?.early_bird?.highlighted_heading?.tag} children={{ className: `${Styles.highlighted_heading} p`, dangerouslySetInnerHTML: { __html: `<span style="color:#FB5741;">${price}</span> ${props?.early_bird?.highlighted_heading?.text}` } }} />
                  ) : (
                    <p className={`${Styles.highlighted_heading} p`} dangerouslySetInnerHTML={{ __html: `<span style="color:#FB5741;">${price}</span> ${props?.early_bird?.highlighted_heading?.text}` }}></p>
                  )}
                </>
              }
              <Link href={`/courses/${props?.slug}/schedule`}>
                <button>{props?.early_bird?.schedule_button?.DisplayName || "View all Schedule"}</button>
              </Link>
            </div>
          </div>
        }

      </div>
    </ViewportWrapper>
  );
}
