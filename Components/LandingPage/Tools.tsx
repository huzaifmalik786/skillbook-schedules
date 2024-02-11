import Image from "next/image";
import Styles from "../../styles/components/landingPage/Tools.module.scss";
import ViewportWrapper from "../ViewportWrapper";
import { useScreenDimensions } from "use-screen-dimensions";
import { HeadingType2, Heading_type, image_type, images } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  data: {
    heading: Heading_type;
    heading_row_1: HeadingType2;
    points_row_1: {
      Item: string;
    }[];
    heading_row_2: HeadingType2;
    points_row_2: {
      Item: string;
    }[];
    image_row_1: images;
    image_row_2: images;
    scroll_id?: string;
  }
  color: string
}

export default function Tools(props: Props) {
  const { width, height } = useScreenDimensions();

  const isMobile = width < 950;

  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor={props.color}>
      <div
        className={Styles.Tools}
        style={{ backgroundColor: `${props.color}` }}
      >
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props?.data?.heading?.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
        ) : (
          <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
        )}
        <div className={Styles.row}>
          {!isMobile && (
            <div className={Styles.col_img}>
              <Image
                src={props.data?.image_row_1?.desktop_image?.data?.attributes?.url}
                alt={props.data?.image_row_1?.desktop_image?.data?.attributes?.alternativeText}
                width={473}
                height={304}
              />
            </div>
          )}
          <div className={Styles.col_content}>
            {props?.data?.heading_row_1?.heading_tag ? (
              <CreateHeading tag={props?.data?.heading_row_1?.heading_tag} children={{ className: `${Styles.sub_heading} h6` }} text={props?.data?.heading_row_1?.Heading} />
            ) : (
              <h6 className={`${Styles.sub_heading} h6`}>{props?.data?.heading_row_1?.Heading}</h6>
            )}
            <ReactMarkdown className={`${Styles.para} p`} rehypePlugins={[rehypeRaw]}>{props?.data?.heading_row_1?.Desc}</ReactMarkdown>
            <div className={Styles.points}>
              {props?.data?.points_row_1 &&
                props.data.points_row_1.map((point, index) => {
                  return (
                    <div className={Styles.point} key={index}>
                      <span className={Styles.check_mark}>
                        <Image
                          src="/check.svg"
                          alt="check_mark"
                          width={4.4}
                          height={3.35}
                        />
                      </span>

                      <p className="p">{point.Item}</p>
                    </div>
                  );
                })
              }

            </div>
          </div>
        </div>
        {isMobile && (
          <div className={Styles.col_img}>
            <Image
              src={props?.data?.image_row_1?.mobile_image?.data?.attributes?.url}
              alt={props?.data?.image_row_1?.mobile_image?.data?.attributes?.alternativeText}
              width={473}
              height={304}
            />
          </div>
        )}
        <div className={Styles.row} style={{ paddingTop: "0px" }}>
          <div className={Styles.col_content}>
            {props?.data?.heading_row_2?.heading_tag ? (
              <CreateHeading tag={props?.data?.heading_row_2?.heading_tag} children={{ className: `${Styles.sub_heading} h6` }} text={props?.data?.heading_row_2?.Heading} />
            ) : (
              <h6 className={`${Styles.sub_heading} h6`}>{props?.data?.heading_row_2?.Heading}</h6>
            )}
            {/* <h6>{props?.data?.heading_row_2?.Heading || "Group Collaboration Tool"}</h6> */}
            <ReactMarkdown className={`${Styles.para} p`} rehypePlugins={[rehypeRaw]}>{props?.data?.heading_row_2?.Desc}</ReactMarkdown>
            <div className={Styles.points}>
              {props?.data?.points_row_2 &&
                props.data.points_row_2.map((point, index) => {
                  return (
                    <div className={Styles.point} key={index}>
                      <span className={Styles.check_mark}>
                        <Image
                          src="/check.svg"
                          alt="check_mark"
                          width={4.4}
                          height={3.35}
                        />
                      </span>

                      <p className="p">{point.Item}</p>
                    </div>
                  );
                })
              }

            </div>
          </div>
          <div className={Styles.col_img} style={{ paddingTop: "25px" }}>
            <Image
              src={isMobile ? props?.data?.image_row_2?.mobile_image?.data?.attributes?.url : props?.data?.image_row_2?.desktop_image?.data?.attributes?.url}
              alt={isMobile ? props?.data?.image_row_2?.mobile_image?.data?.attributes?.alternativeText : props?.data?.image_row_2?.desktop_image?.data?.attributes?.alternativeText}
              width={473}
              height={304}
            />
          </div>
        </div>
      </div>
    </ViewportWrapper>
  );
}
