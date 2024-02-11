import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "../styles/components/CoursesDropdownMobile.module.scss";

const CoursesDropdownMobile = (props: any) => {
  return (
    <div className={Styles.dropdown} onClick={props.onClick}>
      <button className={Styles.dropbtn}>
        {props?.btn || "Courses"}
        <Image
          src={"/WhiteArrow.svg"}
          width={9.88}
          height={9.88}
          alt="DropArrow"
        />
      </button>
    </div>
  );
};
export default CoursesDropdownMobile;
