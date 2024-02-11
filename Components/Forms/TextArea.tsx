import React from "react";
import Styles from "../../styles/components/forms/input.module.scss";

type Props = {
  row: number;
  data?:string;
};

const TextArea = (props: any) => {
  return (
    <div className={Styles.input_container}>
      <textarea name="message" placeholder={props?.data } rows={props.row} onChange={props.onChange}/>
    </div>
  );
};

export default TextArea;
