import Image from "next/image";
import Styles from "../styles/components/ProgramPage/Bar.module.scss";
import { Heading_type, image_type } from "../interfaces/interfaces";
import Link from "next/link";
import CreateHeading from "./CreateHeading";

type Props = {
  data: {
    heading: Heading_type
    Download: {
      Heading: string;
      Link: string;
      icon: image_type;
      heading_tag: string;
    }
  }
}

export default function Bar(props: Props) {
  return (
    <div className={Styles.container}>
      <div className={Styles.bar}>
        {props?.data?.heading?.tag ? (
          <CreateHeading tag={props?.data?.heading?.tag} children={{ className: `${Styles.left} h6` }} text={props?.data?.heading?.text} />
        ) : (
          <h6 className={`${Styles.left} h6`}>
            {props?.data?.heading?.text}
            {/* We’ve worked hard to build the most engaging and interactive agile
          education experiences you will find.{" "} */}
          </h6>

        )}

        <div className={Styles.download_container}>
          <Link href={props?.data?.Download?.Link || "#"}>
            {props?.data?.Download?.heading_tag ? (
              <CreateHeading tag={props?.data?.Download?.heading_tag} children={{ className: `${Styles.orange} h6` }} text={props?.data?.Download?.Heading} />
            ) : (
              <h6 className={`${Styles.orange} h6`}>{props?.data?.Download?.Heading}</h6>
            )}
          </Link>
          <Image src={props?.data?.Download?.icon?.data?.attributes?.url || "download.svg"} width={41} height={41} alt={props?.data?.Download?.icon?.data?.attributes?.alternativeText} />
        </div>
      </div>
    </div>
  );
}
