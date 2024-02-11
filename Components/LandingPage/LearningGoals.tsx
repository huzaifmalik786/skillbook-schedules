import React, { useEffect, useState } from "react";
import Image from "next/image";
import Styles from "../../styles/components/landingPage/learninggoals.module.scss";
import ViewportWrapper from "../ViewportWrapper";
import { useScreenDimensions } from "use-screen-dimensions";
import { Heading_type, image_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  data: {
    heading: Heading_type;
    points: {
      Item: string;
    }[]
    icon: image_type;
    scroll_id?: string;
  }
};

const LearningGoals = (props: Props) => {
  const { width, height } = useScreenDimensions();

  const isMobile = width < 950;

  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor="#f8f8f8">
      <div className={Styles.learning_goals}>
        <div className={Styles.content}>
          {props?.data?.heading?.tag ? (
          <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text || "Learning Goals"}</h4>


        )}
          <div className={Styles.goals_list}>
            {props?.data?.points?.map((goal, index) => {
              return (
                <div key={index} className={Styles.goal}>
                  <span className={Styles.check}>
                    <Image
                      src={"/check.svg"}
                      height={7.31}
                      width={9.59}
                      alt="check"
                    />
                  </span>
                  <ReactMarkdown className={`${Styles.point} p`} rehypePlugins={[rehypeRaw]}>{goal.Item}</ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
        {!isMobile && (
          <div className={Styles.rocket}>
            <Image
              src={props?.data?.icon?.data?.attributes?.url || "/rocket.png"}
              height={253.42}
              width={253.42}
              alt="rocket"
            />
          </div>
        )}
      </div>
    </ViewportWrapper>
  );
};

export default LearningGoals;
