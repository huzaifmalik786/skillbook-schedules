import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Styles from "../styles/components/EarlyBird.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ButtonType, Heading_type } from "../interfaces/interfaces";
import CreateHeading from "./CreateHeading";
import { useSelector } from "react-redux";

type Props = {
  data: boolean;
  slug: string;
  schedule_id: number;
  content: {
    highlighted_heading: Heading_type;
    schedule_button: ButtonType;
    more_info_btn: ButtonType;
  }
};

const EarlyBird = (props: Props) => {
  gsap.registerPlugin(ScrollTrigger);
  const EarlyBird = useRef(null);

  const { schedule, timezone } = useSelector((state: any) => state.schedule);
  const { data } = schedule;
  const { loading } = timezone;

  const [price, setPrice] = useState<string>();

  useEffect(() => {
    const startingPrice = data[props?.schedule_id]?.starting;
    if (startingPrice) {
      setPrice(`${startingPrice.currency} ${startingPrice?.retail_price - startingPrice?.discount_price}`)
    }
  }, [loading, data])


  useEffect(() => {

    gsap.fromTo(
      EarlyBird.current,
      {
        y: 200

      },
      {
        y: 0,
        scrollTrigger: {
          trigger: "#mini-nav",
          start: "top top",
          end: 600,
          toggleActions: "play none none reverse",

        }
      }
    );
    gsap.fromTo(
      EarlyBird.current,
      {
        position: "fixed",
        bottom: "1%"
      },
      {
        position: "sticky ",
        cssFloat: "right",
        bottom: 0,
        scrollTrigger: {
          trigger: ".faq",
          start: "20% bottom",
          end: "bottom 100%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return (
    <div className={`${Styles.EarlyBird} ear`} ref={EarlyBird}>
      {props?.content &&
        <>
          {props.data ? (
            <Link href={props?.content?.more_info_btn?.href || "#"}>
              <button>{props?.content?.more_info_btn?.DisplayName}</button>
            </Link>
          ) : (
            <>
              {price &&
                <>
                  {props?.content?.highlighted_heading?.tag ? (
                    <CreateHeading tag={props?.content?.highlighted_heading?.tag} children={{ className: `${Styles.highlighted_heading} p`, dangerouslySetInnerHTML: { __html: `<span style="color:#FB5741;">${price}</span> ${props?.content?.highlighted_heading?.text}` } }} />
                  ) : (
                    <p className={`${Styles.highlighted_heading} p`} dangerouslySetInnerHTML={{ __html: `<span style="color:#FB5741;">${price}</span> ${props?.content?.highlighted_heading?.text}` }}></p>
                  )}
                </>
              }
              <Link href={`/courses/${props.slug}/schedule`}>
                <button>{props?.content?.schedule_button?.DisplayName}</button>
              </Link>
            </>
          )}
        </>
      }
    </div>
  );
};
export default EarlyBird;
