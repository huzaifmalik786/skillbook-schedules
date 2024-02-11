import React from "react";
import Image from "next/image";
import Styles from "../../styles/components/schedule/noschedulefound.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  isNotFound?: Boolean;
  message: string;
};

const NoScheduleFound = ({ isNotFound, message }: Props) => {
  return (
    <section className={Styles.not_found}>
      <div className={Styles.abcc}>
        {isNotFound ? (
          <Image src={"/close.svg"} height={25} width={25} alt="close" />
        ) : (
          ""
        )}
          {" "}
          <ReactMarkdown className={`p`} rehypePlugins={[rehypeRaw]}>{message}</ReactMarkdown>
      </div>
    </section>
  );
};

export default NoScheduleFound;
