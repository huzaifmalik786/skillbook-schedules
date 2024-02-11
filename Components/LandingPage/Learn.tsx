import Image from "next/image";
import Styles from "../../styles/components/landingPage/Learn.module.scss";
import ViewportWrapper from "../ViewportWrapper";
import PhotoCarousel from "./PhotoCarousel";
import { HeadingType2, Heading_type, image_type2, images } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";


type Props = {
  data: {
    heading: Heading_type
    carousel_images: images[]
    step: HeadingType2[];
    scroll_id?: string;
  }
}
// export default function Learn(){
const Learn = (props: Props) => {
  return (
    <ViewportWrapper ids={props?.data?.scroll_id || ""} bgcolor="#fff9f1">
      <section className={Styles.learn_wrapper}>
        <div className={Styles.learn}>
          {props?.data?.heading?.tag ? (
            <CreateHeading tag={props.data.heading.tag} children={{ className: `${Styles.heading} h4` }} text={props?.data?.heading?.text} />
          ) : (
            <h4 className={`${Styles.heading} h4`}>{props?.data?.heading?.text}</h4>
          )}
          <div className={Styles.points}>
            {props?.data?.step?.map((point, index) => {
              return (
                <div className={Styles.point} key={index}>
                  {/* <div className={Styles.bullet}> &#x2713; </div> */}
                  <span className={Styles.check}>
                    <Image
                      src={"/check.svg"}
                      height={7.31}
                      width={9.59}
                      alt="check"
                    />
                  </span>
                  <div>
                    <span className={Styles.bold_content}>
                      {point.Heading}{" "}
                    </span>{" "}
                    {point.Desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={Styles.learn_carousel}>
          {props?.data?.carousel_images?.length>0 &&
            <PhotoCarousel data={props?.data?.carousel_images} />
          }
        </div>
      </section>
    </ViewportWrapper>
  );
};
export default Learn;
