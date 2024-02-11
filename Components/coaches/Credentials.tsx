import { Heading_type, image_type } from "../../interfaces/interfaces";
import Styles from "../../styles/components/coaches/credentials.module.scss";
import Image from "next/image";
import CreateHeading from "../CreateHeading";
import { useState } from "react";

type Props = {
  credential_data: {
    heading: Heading_type;
    credential_card: {
      text: string;
      icon: image_type;
    }[];
  };
  companies_data: {
    heading: Heading_type;
    icon: {
      original_icon: image_type;
      hover_icon: image_type;
    }[]
  }
}


export default function Credentials(props: Props) {
  const [isHovering, setIsHovered] = useState(-1);
  const onMouseEnter = (index: number) => setIsHovered(index);
  const onMouseLeave = () => setIsHovered(-1);
  return (
    <div className={Styles.Credentials}>
      <div className={Styles.left_container}>
        <div className={Styles.left}>
          {props?.credential_data?.heading?.tag ? (
            <CreateHeading tag={props.credential_data.heading.tag} children={{ className: `${Styles.left_heading} h6` }} text={props?.credential_data?.heading?.text} />
          ) : (
            <h6 className={`${Styles.left_heading} h6`}>{props?.credential_data?.heading?.text}</h6>
          )}
          <div className={Styles.logos}>
            {props?.credential_data?.credential_card &&
              props.credential_data.credential_card.map((cred, index) => {
                return (
                  <div key={index} className={Styles.logo_section}>
                    <Image src={cred.icon?.data?.attributes?.url} width={58} height={58} alt={cred.icon?.data?.attributes?.alternativeText} key={cred?.icon?.data?.id} />
                    <p className={`${Styles.txt} p`}>{cred?.text}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <div className={Styles.right_container}>
        <div className={Styles.right}>
          {props?.companies_data?.heading?.tag ? (
            <CreateHeading tag={props.companies_data.heading.tag} children={{ className: `${Styles.right_heading} h6` }} text={props?.companies_data?.heading?.text} />
          ) : (
            <h6 className={`${Styles.right_heading} h6`}>{props?.companies_data?.heading?.text}</h6>
          )}
          <div className={Styles.companies}>
            {props?.companies_data?.icon &&
              props.companies_data.icon.map((logo, index) => {
                return (
                  <div key={index} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave}>
                    {isHovering == index ? (
                      <Image
                        src={logo?.hover_icon?.data?.attributes?.url}
                        height={27}
                        width={100}
                        alt={logo?.hover_icon?.data?.attributes?.alternativeText}
                        className={Styles.logo}
                      />
                    ) : (
                      <Image
                        src={logo?.original_icon?.data?.attributes?.url}
                        height={27}
                        width={100}
                        alt={logo?.original_icon?.data?.attributes?.alternativeText}
                        className={Styles.logo}
                      />
                    )}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
