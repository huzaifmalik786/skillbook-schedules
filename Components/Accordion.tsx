import Image from "next/image";
import Styles from "../styles/components/faq.module.scss";
import { useState } from "react";

type Props = {
    title: string;
    content: string;
    key: number;
  };

const Accordion = (props: Props) => {
    const [isActive, setIsActive] = useState<Boolean>(false);
    
  
    return (
      <div
        className={Styles.card}
        onClick={() => {setIsActive(!isActive)} }
      >
        <div className={Styles.accordion}>
          <p>{props.title}</p>
          <div className={Styles.arrow}>
            <Image
              src="/arrow_forward_ios.svg"
              alt="arrow"
              fill
              style={isActive ? {transform: 'rotate(180deg)'} : {}}
            />

          </div>
        </div>
        {isActive && <div className={Styles.panel}>{props.content}</div>}
      </div>
    );
  };

  export default Accordion