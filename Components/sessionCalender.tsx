import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Styles from "../styles/components/Calender.module.scss"
import Image from "next/image";


import {
  SingleDatePicker,
} from "react-dates";
import moment from "moment";

// DateInput DateInput_1 DateInput__small DateInput__small_2
const SessionCalender = ({ handleDateChange, date, focused, handleFocusChange }: any) => {
  return (
    <div style={{ width: "min-content" }}>
      <SingleDatePicker
        customInputIcon={
          <button className={Styles.calendar} style={{ padding: 0, width: '100%', display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/schedule_images/Tear-Off Calendar.svg"
              width={18}
              height={18}
              alt="schedule_image"
            />
          </button>
        }
        noBorder={true}
        numberOfMonths={1}
        date={date}
        onDateChange={handleDateChange}
        focused={focused}
        onFocusChange={handleFocusChange}
        id="your_unique_id"
      />

    </div>
  );
};

export default SessionCalender;