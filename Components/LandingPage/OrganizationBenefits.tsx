import Styles from "../../styles/components/landingPage/OrganizationalBenefits.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { image_type } from "../../interfaces/interfaces";

type Props = {
  data: {
    name: string;
    benefit: {
      Icon: image_type;
      Text: string;
    }[];
  }[];
}

export default function OrganizationBenefits(props: Props) {
  const [activeBtn, setActiveBtn] = useState<string>(props?.data[0]?.name)
  const [filteredData, setFilteredData]= useState(props?.data?.find(i=> i?.name==activeBtn));
  const handleBtn = (index: string) => {
    setActiveBtn(index)
  }
  useEffect(()=>{
    setFilteredData(props?.data?.find(i=> i?.name==activeBtn));
  },[activeBtn])
  return (
    <div className={Styles.Benefits}>
      <div className={Styles.left}>
        {props?.data?.map((item, index) => {
          return (
            <button key={index}
              onClick={() => handleBtn(item.name)}
              className={activeBtn == item.name ? Styles.title_1 : Styles.title_2}
            >{item.name}</button>
          )
        })}
      </div>

      <div className={Styles.cards}>
        {filteredData?.benefit?.map((card, index) => {
          return (
            <div className={Styles.card} key={index}>
              <div>
                <Image src={card.Icon?.data?.attributes?.url} alt={card.Icon?.data?.attributes?.alternativeText} width={34} height={34} />
              </div>
              <div className={Styles.text}>{card.Text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
