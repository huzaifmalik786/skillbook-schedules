import { useState, useMemo, useEffect } from "react";
import moment from "moment-timezone";
import Styles from "../styles/components/coaches/sessions.module.scss";
import Highlights from "./Schedule/Highlights";
import NoScheduleFound from "./Schedule/NoScheduleFound";
import SessionsRow from "./SessionsRow";
import SessionCalender from "./sessionCalender";
import { images } from "../interfaces/interfaces";
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from "next/router";
import SessionSkeleton from "./SessionSkeleton";
import { original } from "@reduxjs/toolkit";

type Props = {
  isInstructor?: boolean;
  originalData?: any;
  schedule_messages: {
    more_schedule_message: string;
    no_schedule_message: string;
    register_btn: string;
    learn_more_btn: string;
    more_schedule_btn: string;
    other_options_btn: string;
  }
  loading: boolean
  filter_category?: string;
  data: any;
  timezone: any;
  read_more?: {
    position: string;
    about: string;
    image: images;
    highlight_images: images[];
  }
  read_more_all?: {
    position: string;
    about: string;
    image: images;
    highlight_images: images[];
    get_coach_name: string;
  }[]
};

const thisMonthFilter = (item: any) => {
  const thisMonth = new Date();

  return moment(item?.start_date).format("M") === moment(thisMonth).format("M");
};

const nextMonthFilter = (item: any) => {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return moment(item?.start_date).format("M") === moment(nextMonth).format("M");
};

const weekendFilter = (item: any) => {
  return (
    moment(item?.start_date).day() === 6 || moment(item?.start_date).day() === 0
  );
};
const weekdayFilter = (item: any) => {
  return (
    moment(item?.start_date).day() !== 6 && moment(item?.start_date).day() !== 0
  );
};

// const morningSlotFilter = (item: any) => {
//   const time = moment(item?.start_time, "hh:mm A");

//   return time.isBetween(
//     moment("6:00 AM", "hh:mm A"),
//     moment("12:00 PM", "hh:mm A")
//   );
// };
// const afternoonSlotFilter = (item: any) => {
//   const time = moment(item?.start_time, "hh:mm A");

//   return time.isBetween(
//     moment("12:00 PM", "hh:mm A"),
//     moment("6:00 PM", "hh:mm A")
//   );
// };
// const eveningSlotFilter = (item: any) => {
//   const time = moment(item?.start_time, "hh:mm A");

//   return time.isAfter(moment("6:00 PM", "hh:mm A"));
// };


const Sessions = ({ data, timezone, read_more, read_more_all, isInstructor, loading, filter_category, schedule_messages, originalData }: Props) => {

  // extracting classid from url
  const router = useRouter();
  const { classidusd, classidcad } = router.query;

  // filter calender --
  const [date, setDate] = useState<Date | null>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [activeSchedule, setActiveSchedule] = useState<any>(null);
  const [openMore, setMoreOpen] = useState<number>();
  const [activeMore, setActiveMore] = useState<any>(null);

  const [displayCount, setDisplayCount] = useState<number>(10);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const [isLessThan, setislessthan] = useState<boolean>();

  // checking if the there are any events or not
  const [isNotFound, setisnotfound] = useState<boolean>();


  // filtering data based on the course category. If the category is safe, filter the events by user's location , else display al the events.
  const [filteredCourses, setFilteredCourses] = useState(data);

  // update the schedule list after successful fetching of the schedule and timezone data
  useEffect(() => {
    setFilteredCourses(data);
  }, [data])



  // calender---
  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  const handleFocusChange = ({ focused }: any) => {
    setFocused(focused);
  };

  // calender---end


  // get current time 
  moment.tz.setDefault("America/New_York");

  // current data
  const curr_time = moment();

  // function to check if the event's start time has already passed the current time.
  const checkTime = (date: string, time: string) => {
    const event_date = moment(date);
    const event_time = moment(time, "hh:mm a");

    // if current date is ahead of the event date, return false
    if (curr_time.format("YYYY-MM-DD") > event_date.format("YYYY-MM-DD")) {
      return false;
    }

    // if event date is the current date and event's time is ahead of current time by 1 hour, return false.
    if (curr_time.format("YYYY-MM-DD") == event_date.format("YYYY-MM-DD") && curr_time.hours() > event_time.hours()) {
      return false;
    }
    return true;
  }


  //  applying filters
  const handleFilterChange = (filter: string) => {
    let filters = selectedFilters;

    // month filters
    if (filter === "thisMonth") {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      }
      else {
        filters = selectedFilters.filter((f) => f !== "nextMonth");
        setSelectedFilters([...filters, filter]);
      }
    }
    else if (filter === "nextMonth") {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      }
      else {
        filters = selectedFilters.filter((f) => f !== "thisMonth");
        setSelectedFilters([...filters, filter]);
      }
    }

    // weekdays filter
    else if (filter === "weekend") {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      }
      else {
        filters = selectedFilters.filter((f) => f !== "weekday");
        setSelectedFilters([...filters, filter]);
      }
    }
    else if (filter === "weekday") {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      }
      else {
        filters = selectedFilters.filter((f) => f !== "weekend");
        setSelectedFilters([...filters, filter]);
      }
    }
    else {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      } else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    }

  };


  // clear all filters
  const clearAllFilter = () => {
    setDate(null);
    setSelectedFilters([]);
  };

  // handling filters
  const filteredDataSet = useMemo(() => {
    let finalCourses = filteredCourses;
    if (
      selectedFilters.includes("thisMonth") ||
      selectedFilters.includes("nextMonth")
    ) {
      finalCourses = [];
      if (selectedFilters.includes("thisMonth"))
        finalCourses.push(...filteredCourses?.filter(thisMonthFilter));

      if (selectedFilters.includes("nextMonth")) {
        finalCourses.push(...filteredCourses?.filter(nextMonthFilter));
      }
    }
    if (
      selectedFilters.includes("weekend") ||
      selectedFilters.includes("weekday")
    ) {
      let weekCourses = [];
      if (selectedFilters.includes("weekend")) {
        weekCourses.push(...finalCourses.filter(weekendFilter));
      }

      if (selectedFilters.includes("weekday")) {
        weekCourses.push(...finalCourses.filter(weekdayFilter));
      }
      finalCourses = weekCourses;
    }

    if (date) {
      finalCourses = finalCourses.filter(
        (item: any) =>
          moment(date).format("YYYY-MM-DD") ===
          moment(item?.start_date).format("YYYY-MM-DD")
      );
    }
    return finalCourses;
  }, [selectedFilters, filteredCourses, date]);

  const displayedItems = useMemo(
    () => filteredDataSet?.slice(0, displayCount),
    [displayCount, filteredDataSet]
  );


  useEffect(() => {
    const isNotFound = filteredDataSet?.length === 0;
    const isLessThan = filteredDataSet?.length < 10 && filteredDataSet?.length > 0;
    setisnotfound(isNotFound);
    setislessthan(isLessThan)
  }, [filteredDataSet])

  // searching for the selected date event is in the list
  useEffect(() => {
    if (data) {
      const active = data?.findIndex(function (item: any) {
        return (item.slug == classidusd || item.slug == classidcad);
      })
      setActiveSchedule(data[active]);
    }
  }, [data])

  // load 5 more schedules
  const handleLoadMore = () => {
    setDisplayCount(displayCount + 5);
  };

  // load all schedules from different timezones
  const handleLoadAll = () => {
    setFilteredCourses(originalData);
  }

  // opening the read more section for instructor's details
  const handleOpen = (index: number, coach: string) => {
    let readData = read_more_all?.find((item) => item?.get_coach_name?.toLowerCase().replace(/ /g, "") == coach.toLowerCase().replace(/ /g, ""));
    setMoreOpen(index === openMore ? -1 : index);
    setActiveMore(readData);
  };

  return (
    <div className={Styles.Sessions}>
      {loading && !data?.length ? (
        <>
          <p>Please wait...</p>
          <SessionSkeleton />
          <SessionSkeleton />
          <SessionSkeleton />
        </>

      ) : (
        <>
          <div className={Styles.filters}>
            <button
              className={Styles.button}
              style={
                selectedFilters.includes("thisMonth")
                  ? {
                    backgroundColor: "#555",
                    color: "#fff",
                  }
                  : {}
              }
              onClick={() => handleFilterChange("thisMonth")}
            >
              {" "}
              This Month
            </button>

            <button
              className={Styles.button}
              style={
                selectedFilters.includes("nextMonth")
                  ? {
                    backgroundColor: "#555",
                    color: "#fff",
                  }
                  : {}
              }
              onClick={() => handleFilterChange("nextMonth")}
            >
              Next Month
            </button>

            <button
              className={Styles.button}
              style={
                selectedFilters.includes("weekday")
                  ? {
                    backgroundColor: "#555",
                    color: "#fff",
                  }
                  : {}
              }
              onClick={() => handleFilterChange("weekday")}
            >
              Weekday
            </button>

            <button
              className={Styles.button}
              style={
                selectedFilters.includes("weekend")
                  ? {
                    backgroundColor: "#555",
                    color: "#fff",
                  }
                  : {}
              }
              onClick={() => handleFilterChange("weekend")}
            >
              Weekend
            </button>
            <div className={Styles.sessioncalender}>
              <SessionCalender
                date={date}
                handleDateChange={handleDateChange}
                focused={focused}
                handleFocusChange={handleFocusChange}
              />
              <button onClick={() => clearAllFilter()} className={Styles.filter_txt}>
                Clear filters
              </button>
            </div>
          </div>
          <div className={Styles.columnNames}>
            <p className="p">Date</p>
            <p className="p">Time</p>
            <p className="p">{isInstructor ? "Course" : "Instructor"}</p>
            <p className="p">Price</p>
          </div>
          <div className={Styles.sessions_table}>
            {
              (classidusd || classidcad) && data != null &&
              <>
                {activeSchedule?.id ?
                  <div className={Styles.sessions}>
                    <SessionsRow
                      active
                      event={activeSchedule}
                      zone={timezone?.time_zone?.id}
                      code={timezone?.time_zone?.code}
                      key={activeSchedule?.id}
                      index={activeSchedule.id}
                      handleOpen={handleOpen}
                      isInstructor={isInstructor}
                      schedule_messages={schedule_messages}
                    />
                    {activeSchedule.id === openMore && <Highlights component={false} read_more={activeMore ? activeMore : read_more} />}
                  </div>
                  :
                  <>
                    <p>Please wait...</p>
                    <SessionSkeleton />
                  </>
                }
                <p className={Styles.otherDates}>Other Dates:</p>
              </>
            }

            {(isNotFound) &&
              <NoScheduleFound isNotFound message={schedule_messages?.no_schedule_message} />
            }
            {(!isNotFound) &&
              <>
                {displayedItems?.map((event: any) => {
                  return (
                    <>
                      {event.id !== activeSchedule?.id && checkTime(event.start_date, event.start_time) &&
                        <div key={event.id} className={Styles.sessions}>
                          <SessionsRow
                            event={event}
                            zone={timezone?.time_zone?.id}
                            code={timezone?.time_zone?.code}
                            key={event.id}
                            index={event.id}
                            handleOpen={handleOpen}
                            isInstructor={isInstructor}
                            schedule_messages={schedule_messages}
                          />
                          {event.id === openMore && <Highlights component={false} read_more={activeMore ? activeMore : read_more} />}
                        </div>
                      }
                    </>
                  );
                })}
                {isLessThan && <NoScheduleFound message={schedule_messages?.more_schedule_message} />}
              </>
            }
          </div>

          {displayCount < filteredDataSet?.length && (
            <button className={Styles.schedule_btn} onClick={handleLoadMore}>
              {schedule_messages?.more_schedule_btn}
            </button>
          )}
          {(filter_category?.toLowerCase() === "safe" && originalData?.length > 0 && filteredCourses?.length < originalData?.length && displayCount >= filteredDataSet?.length) &&
            <button className={Styles.schedule_btn} onClick={handleLoadAll}>
              {schedule_messages?.other_options_btn}
            </button>
          }

        </>
      )}
    </div>
  );
};

export default Sessions;