// import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create slice
const name = "schedule";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
  name,
  initialState,
  extraReducers,
  reducers: {
    // setDefaultData: (state: any) => {
    //   state.schedule.data = 
    // }
  },
});

// exports

export const scheduleActions = { ...slice.actions, ...extraActions };

export default slice.reducer;

// implementation

function createInitialState() {
  return {
    allSchedule: {
      loading: true,
      error: false,
      allScheduleData: [],
    },
    schedule: {
      loading: true,
      error: false,
      data: [],
    },
    timezone: {
      timezoneData: {},
      loading: true,
      error: false,
    },
  };
}

function createExtraActions() {
  return {
    fetchSchedule: fetchSchedule(),
    fetchTimeZone: fetchTimeZone(),
    fetchAllSchedule: fetchAllSchedule(),
  };

  function fetchTimeZone() {
    return createAsyncThunk(`${name}/fetchtimezone`, async (obj: any) => {
      try {
        const response = await axios.get(
          `https://api.ipstack.com/check/?access_key=f8cffb6ef2c8da8e1618e12bfaba6df0&fields=time_zone,currency`
        );

        if (!response?.data?.currency) {
          throw response?.data?.error || "IP stack failed!";
        }

        return response?.data;
      } catch (err) {
        axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
          responseEmail: 'cmp@skillbook.com',
          type: window.location.href,
          message: `User faced an error while fetching timezone. Api res is ${JSON.stringify(err)}.`
        })
        throw err;
      }
    });
  }

  function fetchAllSchedule() {
    return createAsyncThunk(`${name}/fetchAllSchedule`, async () => {
      try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/`, {
          params: { action: "get_schedule" },
          timeout: 15000
        })
        return res?.data?.data;
      }
      catch (err) {
        axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
          responseEmail: 'cmp@skillbook.com',
          type: window.location.href,
          message: `User from location ${window.localStorage.getItem("timezone")} faced an error while loading schedules. Api res is ${JSON.stringify(err)}.`
        })
        throw err;
      }
    });
  }

  function fetchSchedule() {
    return createAsyncThunk(`${name}/fetchSchedule`, async (obj: any) => {
      try {
        if (obj.id == null) {
          // window.localStorage.setItem("null", JSON.stringify([]))
          return [];
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/`, {
          params: { action: "get_schedule", course_id: obj.id },
          timeout: 15000
        })

        if (!res?.data?.status && res?.data?.message[0] !== "Event not found.") {
          throw res?.data?.error || res?.data?.message || "Get schedule api failed!";
        }
        // const response = await axios.get(`https://api.ipstack.com/check/?access_key=f8cffb6ef2c8da8e1618e12bfaba6df0&fields=time_zone,currency`);

        // if (!response?.data?.currency) {
        //   throw response?.data?.error || "IP stack failed!";
        // }

        // window.localStorage.setItem("timezone", JSON.stringify(response?.data || {}))

        // const timezone = response?.data;

        // let upcoming_courses =
        //   res?.data?.data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")
        //     .filter((item: any) => {
        //       if (timezone?.currency?.code === "CAD") {
        //         return item?.currency === "CAD";
        //       }
        //       else if (timezone?.currency?.code === "AUD") {
        //         return item?.currency === "AUD";
        //       }
        //       else {
        //         return item.currency === "USD"
        //       }
        //     })
        //   || [];


        // upcoming_courses = obj?.type === "single" && obj?.filter_category?.trim()?.toLowerCase() === "safe" ?
        //   upcoming_courses?.filter((item: any) => {
        //     // filtering for eastern time zone based users
        //     if (["EST", "EDT", "CST", "CDT"].includes(timezone?.time_zone?.code)) {
        //       return item?.timezone_name === "Eastern Time" || item?.timezone_name === "Pacific Time"
        //     }

        //     // filtering for pacific timezone based users
        //     else if (["MST", "MDT", "PST", "PDT"].includes(timezone?.time_zone?.code)) {
        //       return item?.timezone_name === "Pacific Time"
        //     }

        //     // filtering for australian timezone based users
        //     else if (["AWST", "ACWST", "ACST", "AEST", "LHST", "ACDT", "AEDT", "LHDT"].includes(timezone?.time_zone?.code)) {
        //       return item?.timezone_name === "Australian Eastern Time"
        //     }

        //     // return events from all the timezones
        //     else {
        //       return true;
        //     }
        //   })
        //   : upcoming_courses


        // if (obj.id == null) {
        //   window.localStorage.setItem("all", JSON.stringify(upcoming_courses || []))
        // }
        // else {
        //   const data = [...upcoming_courses];
        //   const lowPriceCourse = data?.sort((a, b) => {
        //     return a.discount_price - b.discount_price;
        //   })
        //   window.localStorage.setItem(obj.id, JSON.stringify({ data: upcoming_courses || [], starting: lowPriceCourse ? lowPriceCourse[0] : {} }))
        // }
        return res?.data?.data;
      }
      catch (err) {
        axios.post("https://fn3splbth7.execute-api.ap-south-1.amazonaws.com/send-email", {
          responseEmail: 'cmp@skillbook.com',
          type: window.location.href,
          message: `User from location ${window.localStorage.getItem("timezone")} faced an error while loading schedules. Api res is ${JSON.stringify(err)}. Object id is ${JSON.stringify(obj)}`
        })
        return obj?.data;
      }
    });
  }
}
function createExtraReducers() {
  return {
    ...fetchSchedule(),
    ...fetchTimeZone(),
    ...fetchAllSchedule()
  };

  function fetchSchedule() {
    const { pending, fulfilled, rejected }: any = extraActions.fetchSchedule;
    return {
      [pending]: (state: any) => {
        state.schedule = { ...state.schedule, loading: state?.schedule?.data?.length === 0, error: false };
      },

      [fulfilled]: (state: any, action: any) => {
        const obj = action?.meta?.arg;
        const timezone = state?.timezone?.timezoneData;
        const data = action?.payload;
        const original_data =
          data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")
            .filter((item: any) => {
              if (timezone?.currency?.code === "CAD") {
                return item?.currency === "CAD";
              }
              else if (timezone?.currency?.code === "AUD") {
                return item?.currency === "AUD";
              }
              else {
                return item.currency === "USD"
              }
            })
          || [];

        const filtered_data = obj?.filter_category?.trim()?.toLowerCase() === "safe" ?
          original_data?.filter((item: any) => {
            // filtering for eastern time zone based users
            if (["EST", "EDT", "CST", "CDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Eastern Time" || item?.timezone_name === "Pacific Time"
            }

            // filtering for pacific timezone based users
            else if (["MST", "MDT", "PST", "PDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Pacific Time"
            }

            // filtering for australian timezone based users
            else if (["AWST", "ACWST", "ACST", "AEST", "LHST", "ACDT", "AEDT", "LHDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Australian Eastern Time"
            }

            // return events from all the timezones
            else {
              return true;
            }
          })
          : original_data;

        const dataCopy = [...original_data];
        const lowPriceCourse = dataCopy?.sort((a, b) => {
          return a.discount_price - b.discount_price;
        })
        state.schedule = {
          data: { ...state.schedule.data, [obj.id]: { originalData: original_data, filteredData: filtered_data, starting: lowPriceCourse ? lowPriceCourse[0] : {} } },
          loading: false,
          error: false,
        };
      },

      [rejected]: (state: any, action: any) => {
        state.schedule = {
          ...state.schedule,
          error: true,
          loading: false,
        };
      },
    };
  }

  function fetchAllSchedule() {
    const { pending, fulfilled, rejected }: any = extraActions.fetchAllSchedule;
    return {
      [pending]: (state: any) => {
        state.allSchedule = { ...state.allSchedule, loading: state?.allSchedule?.allScheduleData?.length === 0, error: false };
      },
      [fulfilled]: (state: any, action: any) => {
        const timezone = state?.timezone?.timezoneData;
        const data = action?.payload;
        let upcoming_courses =
          data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")
            .filter((item: any) => {
              if (timezone?.currency?.code === "CAD") {
                return item?.currency === "CAD";
              }
              else if (timezone?.currency?.code === "AUD") {
                return item?.currency === "AUD";
              }
              else {
                return item.currency === "USD"
              }
            })
          || [];
        state.allSchedule = {
          loading: false,
          allScheduleData: upcoming_courses,
          error: false,
        };
      },
      [rejected]: (state: any) => {
        state.allSchedule = {
          ...state.allSchedule,
          error: true,
          loading: false,
        };
      },
    };
  }

  function fetchTimeZone() {
    const { pending, fulfilled, rejected }: any = extraActions.fetchTimeZone;
    return {
      [pending]: (state: any) => {
        state.timezone = { ...state.timezone, loading: !state?.timezone?.timezoneData?.time_zone };
      },
      [fulfilled]: (state: any, action: any) => {
        const obj = action?.meta?.arg;
        const timezone = action?.payload;

        const original_data =
          obj?.data?.filter((item: any) => item.is_upcoming !== "No" && item.show_hide !== "Hide")
            .filter((item: any) => {
              if (timezone?.currency?.code === "CAD") {
                return item?.currency === "CAD";
              }
              else if (timezone?.currency?.code === "AUD") {
                return item?.currency === "AUD";
              }
              else {
                return item.currency === "USD"
              }
            })
          || [];

        const filtered_data = obj?.filter_category?.trim()?.toLowerCase() === "safe" ?
          original_data?.filter((item: any) => {
            // filtering for eastern time zone based users
            if (["EST", "EDT", "CST", "CDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Eastern Time" || item?.timezone_name === "Pacific Time"
            }

            // filtering for pacific timezone based users
            else if (["MST", "MDT", "PST", "PDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Pacific Time"
            }

            // filtering for australian timezone based users
            else if (["AWST", "ACWST", "ACST", "AEST", "LHST", "ACDT", "AEDT", "LHDT"].includes(timezone?.time_zone?.code)) {
              return item?.timezone_name === "Australian Eastern Time"
            }

            // return events from all the timezones
            else {
              return true;
            }
          })
          : original_data;


        const dataCopy = [...original_data];

        const lowPriceCourse = dataCopy?.sort((a, b) => {
          return a.discount_price - b.discount_price;
        })
        if (obj?.id != null) {
          state.schedule = {
            data: { ...state.schedule.data, [obj.id]: { originalData: original_data, filteredData: filtered_data, starting: lowPriceCourse ? lowPriceCourse[0] : {} } },
            loading: false,
            error: false,
          };
        }
        else if (obj?.allSchedules) {
          state.allSchedule = {
            loading: false,
            allScheduleData: original_data,
            error: false,
          };
        }

        state.timezone = {
          loading: false,
          timezoneData: action?.payload,
          error: false,
        };
      },
      [rejected]: (state: any, action: any) => {
        const obj = action?.meta?.arg;
        const original_data = obj?.data?.filter((item: any) => {
          return item?.currency === "USD";
        })

        const dataCopy = [...original_data];
        const lowPriceCourse = dataCopy?.sort((a, b) => {
          return a.discount_price - b.discount_price;
        })

        if (obj?.id != null) {
          state.schedule = {
            data: { ...state.schedule.data, [obj.id]: { originalData: original_data, filteredData: original_data, starting: lowPriceCourse ? lowPriceCourse[0] : {} } },
            loading: false,
            error: false,
          };
        }
        else if (obj?.allSchedules) {
          state.allSchedule = {
            loading: false,
            allScheduleData: original_data,
            error: false,
          };
        }
        state.timezone = { ...state.timezone, loading: false, error: true };
      },
    };
  }
}
