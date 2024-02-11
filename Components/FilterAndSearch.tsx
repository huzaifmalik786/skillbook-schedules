import React, { useState } from "react";
import Styles from "../styles/components/filterandsearch.module.scss";
import { CourseTagType } from "../interfaces/interfaces";

type Props = {
  placeholder: string;
  filters: CourseTagType
  search_button: string;
  setActiveBtn: Function
  setsearch: Function;
  activeBtn: string;
};

const FilterAndSearch = (props: Props) => {
  const handleBtn = (index: string) => {
    props.setActiveBtn(index)
  };
  return (
    <div className={Styles.search_filter}>
      <div className={Styles.filter}>
        {props?.filters?.data?.map((btn, index) => {
          return (
            <button
              className={`${Styles.btn} ${
                props?.activeBtn === btn?.attributes?.category && `${Styles.active}`
              } `}
              key={index}
              onClick={() => {
                return handleBtn(btn?.attributes?.category);
              }}
            >
              {btn?.attributes?.category}
            </button>
          );
        })}
      </div>
      <div className={Styles.search_input}>
        <input type="text" placeholder={props.placeholder} onChange={(event)=> props.setsearch(event.target.value)}/>
        <button className={Styles.search_btn}>{props?.search_button || "Search"}</button>
      </div>
    </div>
  );
};

export default FilterAndSearch;
