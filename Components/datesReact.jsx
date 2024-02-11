import React, { useState } from "react";
import Image from "next/image";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Styles from "../styles/components/Calender.module.scss";

import { DateRangePicker } from "react-dates";

import moment from "moment";
// DateInput DateInput_1 DateInput__small DateInput__small_2
const DatesReact = ({
  startDate,
  endDate,
  focusedInput,
  setFocusedInput,
  handleDateRangeChange,
}) => {
  return (
    <div>
      <DateRangePicker
        customInputIcon={
          <Image
            src="schedule_images/Tear-Off Calendar.svg"
            width={18}
            height={18}
            alt="img"
            style={{
              background: startDate == null ? "#E4E4E4" : "#555555",
              display: "block",
              color: "#ffffff",
              padding: 0,
            }}
          />
        }
        noBorder={true}
        startDatePlaceholderText="start date"
        endDatePlaceholderText="end date"
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={handleDateRangeChange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
      />
    </div>
  );
};

export default DatesReact;
