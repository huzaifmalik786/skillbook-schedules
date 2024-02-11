import rehypeRaw from "rehype-raw";
import { HeadingType2, Heading_type } from "../../interfaces/interfaces";
import Styles from "../../styles/components/landingPage/InteractiveLearning.module.scss";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type Props = {
  data: {
    heading: Heading_type;
    Sub_heading: HeadingType2;
    scroll_id?: string;
  }
}

export default function InteractiveLearning(props: Props) {
  return (
    <div className={Styles.InteractiveLearning} id={props?.data?.scroll_id || ""}>
      {props?.data?.heading?.tag ? (
        <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
      ) : (
        <h4 className={`${Styles.heading} h4`}>{props.data?.heading?.text}</h4>
      )}

      {props?.data?.Sub_heading?.heading_tag ? (
        <CreateHeading tag={props.data.Sub_heading.heading_tag} children={{ className: `${Styles.sub_heading} h6` }} text={props?.data?.Sub_heading?.Heading} />
      ) : (
        <h6 className={`${Styles.sub_heading} h6`}>{props?.data?.Sub_heading?.Heading}</h6>
      )}
      <ReactMarkdown className="p" rehypePlugins={[rehypeRaw]}>{props?.data?.Sub_heading?.Desc}</ReactMarkdown>
    </div>
  );
}
