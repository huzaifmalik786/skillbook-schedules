import React from "react";
import Styles from "../styles/components/categories.module.scss";

type Props={
  data: {
    Name: string;
      Desc: string;
  }[]
}

const CourseCategories = (props: Props) => {
  return (
    <div className={Styles.categories}>
      {(props.data)?.map((category, index) => {
        return (
          <div key={index} className={Styles.category}>
            <h4 className="h4">{category?.Name}</h4>
            <span />
            <p className="p">{category?.Desc}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCategories;
