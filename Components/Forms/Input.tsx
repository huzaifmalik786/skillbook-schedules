import Image from "next/image";
import React from "react";
import Styles from "../../styles/components/forms/input.module.scss";
// import PhoneCode from './PhoneCode'¯

const Input = (props: any) => {
  const label=props.name;
  // console.log(label);  
  let flag=false;
  label==="courseType"? flag=true :flag=false
  return (
    <div className={Styles.input_container}>
      <input
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        disabled={flag}
        // required
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
