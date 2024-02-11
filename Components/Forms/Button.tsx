import React, { useState, useRef } from "react";
import Styles from "../../styles/components/forms/button.module.scss";

const Button = (props: any) => {
  // console.log(props)
  return (
    <>
      <button
        className={Styles.form_button}
        // type="submit"
        onClick={props.onClick}
        style={{ backgroundColor: `${props.bgcolor}`,width:`${props.width}` }}
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
