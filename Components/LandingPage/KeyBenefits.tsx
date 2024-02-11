import React, { useEffect } from "react";
import Image from "next/image";
import Styles from "../../styles/components/landingPage/keybenefits.module.scss";

import dynamic from "next/dynamic";
import ViewportWrapper from "../ViewportWrapper";
import { Heading_type, image_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";

const ChartComponent = dynamic(() => import("./Chart"), {
  ssr: false,
});
type Props = {
  data: {
    heading: Heading_type;
    benefit: {
      key: string;
      value: string;
      colour: string;
    }[];
    chart: {
      name: string;
      depth: number;
      value: number;
      color: string;
      icon: image_type
      hover_text: string;
    }[];
    scroll_id?: string;
  }
};


const KeyBenefits = (props: Props) => {
  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor="#fff9f1">
      <div className={Styles.benefits_wrapper} id={props?.data?.scroll_id}>
        <div className={Styles.content}>
          {props?.data?.heading?.tag ? (
            <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
          ) : (
            <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
          )}
          <div className={Styles.benefits_list}>
            {props?.data?.benefit?.map((benefit, index) => {
              return (
                <div key={index} className={Styles.benefit}>
                  <span
                    className={Styles.check}
                    style={{ backgroundColor: benefit.colour }}
                  />
                  <span className={Styles.text}>
                    <p className={`${Styles.key} p`}> {benefit.key} :</p>
                    <p className={`${Styles.vlaue} p`}>{benefit.value}</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div id="chartdiv" className={Styles.chart}>
          <ChartComponent data={props?.data?.chart} />
        </div>
      </div>
    </ViewportWrapper>
  );
};

export default KeyBenefits;
