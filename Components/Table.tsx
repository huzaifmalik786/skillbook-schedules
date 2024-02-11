/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Styles from "../styles/Table.module.scss";
import { useEffect, useState } from "react";
import { useScreenDimensions } from "use-screen-dimensions";
import { image_type } from "../interfaces/interfaces";

type Props = {
  data: {
    course: string;
    duration: string;
    icon: image_type;
  }[];
  heading1: string;
  heading2: string;
};

export default function Table(props: Props) {
  const [width, setWidth] = useState(223);
  const size = useScreenDimensions();

  useEffect(() => {
    if (!(size.width < 950)) {
      props?.data?.length < 4 ? setWidth(223) : setWidth(212);
    }
  }, []);
  
  return (
    <>
      <div className={Styles.table}>
        <div className={Styles.header}>
          <p className={`${Styles.heading1} p`}>{props?.heading1}</p>
          <p className={`${Styles.heading2} p`}>{props?.heading2}</p>
          {/* )
          })} */}
          {/* <div className={Styles.courseName}>
            <p className={Styles.courseName_txt}>Course Name</p>
          </div> */}
          {/* <div className={Styles.days}>
            <p className={Styles.days_txt}>Days</p>
          </div> */}
          {/* <div className={Styles.Timing}>
            <p className={Styles.Timing_txt}>Duration</p>
          </div> */}
        </div>
        <div className={Styles.rows}>
          {props?.data?.map((row: any, index: number) => {
            return (
              <div key={index} className={Styles.row}>
                <div
                  className={Styles.courseName}
                  style={
                    index % 2 == 0
                      ? { backgroundColor: "#F9FAFB" }
                      : { backgroundColor: "white" }
                  }
                >
                  <Image src={row?.icon?.data?.attributes?.url} width={40} height={36.19} alt={row?.icon?.data?.attributes?.alternativeText} style={{ objectFit: "contain" }} />
                  <p className={`${Styles.courseName_txt} p`}>{row.course}</p>
                </div>
                {/* <div
                  className={Styles.days}
                  style={
                    index % 2 == 0
                      ? { backgroundColor: "#F9FAFB" }
                      : { backgroundColor: "white" }
                  }
                >
                  <p className={Styles.days_txt}>{row.days}</p>
                </div> */}
                <div
                  className={Styles.Timing}
                  style={
                    index % 2 == 0
                      ? { backgroundColor: "#F9FAFB", width: `${width}px` }
                      : { backgroundColor: "white", width: `${width}px` }
                  }
                >
                  <p className={`${Styles.Timing_txt} p`}>{row.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
