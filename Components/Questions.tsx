import Styles from "../styles/Questions.module.scss";
import Image from "next/image";
import { useState } from "react";
import Question from "./Question";
import ConsultantForm from "./ConsultantForm";
type Props = {
  data: {
    id: number;
    Ques: string;
    Answer: string;
  }[]
};
const Questions = (props: Props) => {
  const [flag, setFlag] = useState<number | null>();
  return (
    <div className={Styles.questions}>
      {props.data?.map((faq: { id: number; Ques: string; Answer: string }) => {
        return <Question key={faq?.id} data={faq} flag={flag} setFlag={setFlag}/>;
      })}
    </div>
  );
};
export default Questions;
