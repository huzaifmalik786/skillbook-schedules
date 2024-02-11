import Sessions from "../Sessions";
import SessionHeader from "./SessionHeader";
import Discount from "./Discount";
import Styles from "../../styles/components/coaches/SessionSection.module.scss";
import { useEffect } from "react";
import { scheduleActions } from "../../redux/slices/schedule";
import { useSelector } from "react-redux";
import { dispatch } from "../../redux/store";
import { ButtonType, HeadingType2, Heading_type } from "../../interfaces/interfaces";

import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

type Props = {
  isInstructor?: boolean;
  scheduleData: any;
  data: {
    heading: Heading_type;
    highlighted_heading: Heading_type;
    button: ButtonType;
    discount_card: HeadingType2
  }
  name: Heading_type;
  heading: Heading_type;
  schedule_messages: {
    more_schedule_message: string;
    no_schedule_message: string;
    register_btn: string;
    learn_more_btn: string;
    more_schedule_btn: string;
    other_options_btn: string;
  }
}


export default function SessionSection(props: Props) {

  const { fetchTimeZone } = scheduleActions;

  const { allSchedule, timezone } = useSelector((state: any) => state.schedule);
  const { allScheduleData } = allSchedule

  const { timezoneData, loading } = timezone;

  // const [data, setData] = props?.scheduleData;
  const filterdata = allScheduleData?.filter((e: any) => {
    return e.instructor_name?.toLowerCase().replace(/ /g, "") === props.name?.text?.toLowerCase().replace(/ /g, "");
  })

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchTimeZone({ data: props?.scheduleData, allSchedules: true }))
    }
    getData();
  }, []);


  return (
    <Sessions
      data={filterdata || []}
      timezone={timezoneData}
      isInstructor={props.isInstructor}
      loading={loading}
      schedule_messages={props?.schedule_messages}
    />
  );
}
