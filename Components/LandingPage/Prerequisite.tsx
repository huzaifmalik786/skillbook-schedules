import Styles from "../../styles/components/landingPage/Prerequisite.module.scss";
import Image from "next/image";
import ViewportWrapper from "../ViewportWrapper";
import { HeadingType, HeadingType2, Heading_type } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";


type Props = {
  data: {
    heading_badge: Heading_type;
    heading: HeadingType2;
    points_heading: Heading_type;
    scroll_id?: string;
  }
  points: {
    point: HeadingType[];
  }[];
}

export default function Prerequisite(props: Props) {
  return (
    <ViewportWrapper ids="" bgcolor="#fff9f1">
      <div className={Styles.Prerequisite} id={props?.data?.scroll_id || "Exam"}>
        <div className={Styles.left}>
          {props?.data?.heading_badge?.tag ? (
            <CreateHeading tag={props.data.heading_badge.tag} children={{ className: `${Styles.title_left} h4` }} text={props?.data?.heading_badge?.text} />
          ) : (
            <h4 className={`${Styles.title_left} h4`}>{props.data?.heading_badge?.text }</h4>
          )}
          {props?.data?.heading?.heading_tag ? (
            <CreateHeading tag={props.data.heading.heading_tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.Heading} />
          ) : (
            <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.Heading}</h4>
          )}
          <ReactMarkdown className="p" rehypePlugins={[rehypeRaw]}>
            {props?.data?.heading?.Desc}
          </ReactMarkdown>
        </div>
        <div className={Styles.right}>
          <div className={Styles.points}>
            <div className={Styles.right}>
              {props?.data?.points_heading?.tag ? (
                <CreateHeading tag={props.data.points_heading.tag} children={{ className: `${Styles.title_right} h4` }} text={props?.data?.points_heading?.text} />
              ) : (
                <h4 className={`${Styles.title_right} h4`}>{props?.data?.points_heading?.text || "Exam Format"}</h4>

              )}
              <div className={Styles.points}>
                {props?.points?.map((point, index) => {
                  return (
                    <div className={Styles.point} key={index}>
                      <div className={Styles.check}>
                        <Image
                          src={"/check.svg"}
                          height={7.31}
                          width={9.59}
                          alt="check_mark"
                        />
                      </div>
                      <p className="p">{((point?.point?.map((item, key) => {
                        return (
                          <span key={key}>
                            {item.Highlight ? <span className={Styles.orange}> {item.Text} </span> : item.Text}
                          </span>
                        )
                      })))}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewportWrapper>
  );
}
