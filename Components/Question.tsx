import React, { useState } from "react";
import Styles from "../styles/components/Question.module.scss";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const Question = (props: any) => {
  return (
    <>
      <div
        className={Styles.question}
        onClick={() => {
       
          if (props?.data?.id == props?.flag) {
            props.setFlag(null);
          }
          else {
            props.setFlag(props?.data?.id);

          }
        }}
      >
        <button className={Styles.img}>
          <Image
            src={props.flag === props?.data?.id ? "/FAQ_images/minus.png":"/FAQ_images/Vector.svg"}
            alt="Vector"
            width={17}
            height={17}
          />
        </button>
        <span>{props?.data?.Ques}</span>
      </div>
      {props.flag === props?.data?.id &&
        <ReactMarkdown className={`${Styles.ans_on} p`} rehypePlugins={[rehypeRaw]}>{props?.data?.Answer}</ReactMarkdown>
      }
    </>
  );
};
export default Question;
