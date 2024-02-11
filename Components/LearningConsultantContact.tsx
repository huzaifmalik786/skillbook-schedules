import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
const PopUpForm = dynamic(() => import("../Components/PopUpForm"), { ssr: false })
const ThankYou = dynamic(() => import("../Components/Forms/ThankYou"));
import Styles from "../styles/components/LearningConsultantContact.module.scss";
import { Formdata } from "../interfaces/interfaces";

type Props = {
  formdata: Formdata
  CTA: boolean;
  data: {
    button_1: string
    button_2: string;
  }
};
export default function LearningConsultantContact(props: Props) {
  const [openForm, setOpenForm] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  gsap.registerPlugin(ScrollTrigger);

  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        bottom: "17%",
        position: "fixed",
        zIndex: "999"
      },
      {
        position: "sticky",
        cssFloat: "right",
        bottom: "4%",
        zIndex: "10",
        scrollTrigger: {
          trigger: ".faq",
          start: "20% bottom",
          end: "bottom 100%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [window.scrollY]);

  return (
    <>
      {openModal &&
        <ThankYou setModal={setOpenModal} openModal={openModal} data={props?.formdata?.ThankYouMessage} />
      }
      {openForm !== 0 &&
        <PopUpForm openForm={openForm} setOpenForm={setOpenForm} formData={props.formdata} heading={openForm === 1 ? props?.data?.button_1 : props?.data?.button_2} setOpenModal={setOpenModal} email={props?.formdata?.ResponseEmail}/>
      }
      <div className={Styles.wrapper}>
        {!props.CTA && props?.data?.button_1 ? (
          <div className={Styles.frame} ref={ref}>
            <button onClick={() => setOpenForm(1)}>
              {props?.data?.button_1}
            </button>
          </div>
        ) : (
          <>
            {props?.data?.button_2 &&
              <div className={Styles.frame} ref={ref}>

                <button onClick={() => setOpenForm(2)}>
                  {props?.data?.button_2}
                </button>
              </div>
            }

          </>
        )}
      </div>
    </>
  );
}
