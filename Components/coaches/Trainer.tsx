import Styles from "../../styles/components/coaches/Trainer.module.scss";
import Image from "next/image";
import ViewportWrapper from "../ViewportWrapper";
import { useScreenDimensions } from "use-screen-dimensions";
import MultiCarousel from "../Carousel";
import { Heading_type, images, trainerFeatureType } from "../../interfaces/interfaces";
import CreateHeading from "../CreateHeading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

type Props = {
  data: {
    name: Heading_type;
    position: Heading_type;
    about: string;
    images: images;
    Trainer_feature: trainerFeatureType[];
  }
  button: string;
}
export default function Trainer(props: Props) {
  const { width } = useScreenDimensions();
  const isMobile = width < 950;

  gsap.registerPlugin(ScrollToPlugin);

  const scrollToSection = () => {
    gsap.to(window, {
      scrollTo: {
        y: "#instructor_schedules",
        autoKill: false,
        offsetY: 20 // adjust this value to offset the scroll position
      },
      duration: 0.5,
    });
  };

  return (
    <ViewportWrapper ids="" bgcolor="">
      <div className={Styles.Trainer}>
        <div className={Styles.left}>
          {props?.data?.name?.tag ? (
            <CreateHeading tag={props.data.name.tag} children={{ className: `${Styles.heading} h3` }} text={props?.data?.name?.text} />
          ) : (
            <h3 className={`${Styles.heading} h3`}>{props?.data?.name?.text}</h3>
          )}

          {props?.data?.position?.tag ? (
            <CreateHeading tag={props.data.position.tag} children={{ className: `${Styles.sub_heading} h4` }} text={props?.data?.position?.text} />
          ) : (
            <h4 className={`${Styles.sub_heading} h4`}>{props?.data?.position?.text}</h4>
          )}
          <ReactMarkdown className={`${Styles.left_para} p`} rehypePlugins={[rehypeRaw]}>
            {props.data?.about}
          </ReactMarkdown>
          {!isMobile ? (
            <div className={Styles.features}>
              {props?.data?.Trainer_feature &&
                props.data.Trainer_feature.map((service, index) => {
                  return (
                    <div className={Styles.feature} key={index}>
                      <Image
                        src={service.icon?.data?.attributes?.url}
                        width={44}
                        height={44}
                        alt={service.icon?.data?.attributes?.alternativeText}
                        priority
                      />
                      <div>
                        <span className={Styles.label}>{service.label}</span>
                        <span className={Styles.content}>{service.content}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          ) : (
            <MultiCarousel dots={true} infinite="false">
              {props?.data?.Trainer_feature &&
                props.data.Trainer_feature.map((service, index) => {
                  return (
                    <div className={Styles.features} key={index}>
                      <div className={Styles.feature} key={index}>
                        <div>
                          <div className={Styles.label}>{service.label}</div>
                          <span className={Styles.content}>
                            {service.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </MultiCarousel>
          )}
        </div>

        <div className={Styles.right}>
          <Image
            key={props?.data?.images?.id}
            src={isMobile ? props?.data?.images?.mobile_image?.data?.attributes?.url : props?.data?.images?.desktop_image?.data?.attributes?.url}
            width={257}
            height={236}
            alt={isMobile ? props?.data?.images?.mobile_image?.data?.attributes?.alternativeText : props?.data?.images?.desktop_image?.data?.attributes?.alternativeText}
            style={{ objectFit: "cover", alignSelf: "center" }}
            priority
          />
          {props?.button &&
            <button onClick={scrollToSection}>{props?.button}</button>
          }
        </div>

      </div>
    </ViewportWrapper>
  );
}
