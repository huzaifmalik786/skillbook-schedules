import React, { useEffect, useState } from "react";
import { CoachCardType, CourseTagType, HeadingType2, Heading_type, image_type, images } from "../../interfaces/interfaces";
import Styles from "../../styles/components/instructors/ourcoaches.module.scss";
import FilterAndSearch from "../FilterAndSearch";
import CoachCard from "./CoachCard";

type Props = {
  data: {
    search_button: string;
    filters: CourseTagType;
    read_more_btn: string;
    view_schedule_btn: string;
  }
  activeBtn: string;
  setActiveBtn: (filter: string) => void;
  our_coaches: {
    coaches: {
      data: {
        id: number;
        attributes: {
          slug: string;
					show_schedule_btn: boolean;
          coach_card: {
            name: Heading_type;
            position: Heading_type;
            images: images;
          }
          filters: CourseTagType
        }
      }[]
    }
  };
};

const OurCoaches = (props: Props) => {
  const [searchname, setsearchname] = useState("");
  const [filterdata, setfilterdata] = useState(props?.our_coaches?.coaches?.data);

  useEffect(() => {
    if (props.activeBtn !== "") {
      const filterdata = (props?.our_coaches?.coaches?.data)?.filter((i) => { return i?.attributes?.filters?.data?.find(i => i?.attributes?.category == props.activeBtn) })
      if (searchname !== "") {
        const newdata = filterdata.filter((data) => {
          if (data?.attributes?.coach_card?.name?.text?.toString().toLowerCase().includes(searchname.toString().toLowerCase())) {
            return true;
          }
        })
        setfilterdata(newdata);
      }
      else {
        setfilterdata(filterdata);
      }
    }
    else {
      if (searchname !== "") {
        const newdata = props?.our_coaches?.coaches?.data?.filter((data) => {
          if (data?.attributes?.coach_card?.name?.text?.toString().toLowerCase().includes(searchname.toString().toLowerCase())) {
            return true;
          }
        })
        setfilterdata(newdata);
      }
      else {
        setfilterdata(props?.our_coaches?.coaches?.data);
      }
    }
  }, [props.activeBtn, searchname, ""])
  return (
    <>
      <section className={Styles.our_coaches_wrapper}>
        <FilterAndSearch placeholder="Search by Coaches" filters={props?.data?.filters} search_button={props?.data?.search_button} setActiveBtn={props.setActiveBtn} setsearch={setsearchname} activeBtn={props.activeBtn} />
        <div className={Styles.all_coaches}>
          {filterdata?.map((coach, index) => {
            return <CoachCard card={coach.attributes.coach_card} key={index} slug={coach?.attributes?.slug} buttons={props?.data} showbtn={coach?.attributes?.show_schedule_btn}/>;
          })}
        </div>
      </section>
    </>
  );
};

export default OurCoaches;
