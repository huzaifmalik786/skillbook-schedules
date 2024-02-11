import React from "react";
import { useSelector } from "react-redux";
import Styles from "../styles/components/sessionrow.module.scss";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { useScreenDimensions } from "use-screen-dimensions";

type Props = {
  event: any;
  zone: string;
  handleOpen: Function;
  index: number;
  isInstructor?: boolean
  active?: boolean
  code: string;
  schedule_messages: {
    more_schedule_message: string;
    no_schedule_message: string;
    register_btn: string;
    learn_more_btn: string;
  }
};

const SessionsRow = ({ index, handleOpen, event, zone, isInstructor, active, code, schedule_messages }: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 950;
  moment.tz.setDefault("America/New_York");

  // const { timezone } = useSelector((state: any) => state.timezone);

  const Moment = (value: any, format: string) => {
    return zone && moment(value, "hh:mm a").tz(zone).format(format);
  };

  // const userLocationPrice = event?.event_currencies?.filter(
  //   (item: any) =>
  //     item?.currency_info.currency_code === timezone?.data.currency?.code
  // );

  // const defaultLocatinPrice = event?.event_currencies?.filter(
  //   (item: any) => item?.currency_info.currency_code === "USD"
  // );

  gsap.registerPlugin(ScrollToPlugin);

  // function to scroll the session row to top of the screen on click in mobile
  const handleClick = (index: number, instructor: string) => {
    handleOpen(index, instructor);
    if (isMobile) {
      gsap.to(window, {
        scrollTo: {
          y: `#session${index}`,
          autoKill: false,
          offsetY: 0
        },
        duration: 0.8,
      });
    }

  }

  return (
    <div className={`${Styles.session} ${active ? Styles.active : ""}`} key={event.id} id={`session${index}`}>
      {active &&
        <div className={Styles.selected}>
          <p className={Styles.selected_text}>Selected Date</p>
        </div>
      }
      <div className={Styles.row}>
        <div className={Styles.schedule} style={{ backgroundColor: "black" }}>
          <div className={Styles.month}>
            <p>{moment(event?.start_date).format("MMM")}</p>
            {moment(event?.start_date).format("MMM") !==
              moment(event?.end_date).format("MMM") ? (
              <p>{moment(event?.end_date).format("MMM")}</p>
            ) : (
              " "
            )}
          </div>

          <div className={Styles.dates}>
            <h6>{moment(event?.start_date).format("DD")}</h6>
            <h6>{moment(event?.end_date).format("DD")}</h6>
          </div>

          <div
            className={Styles.note}
            style={{
              backgroundColor:
                moment(event?.start_date).day() === 6 ||
                  moment(event?.start_date).day() === 0
                  ? "#ffeeda"
                  : "",
            }}
          >
            <p>
              {moment(event?.start_date).format("ddd")} -{""}
              {moment(event?.end_date).format("ddd")}
            </p>
          </div>
        </div>
        <div className={Styles.timing}>
          <p className={Styles.time}>
            {Moment(event?.start_time, "A") === Moment(event?.end_time, "A") ? (
              <>
                {zone ? Moment(event?.start_time, "hh:mm") : moment(event?.start_time, "hh:mm a").format("hh:mm")} -{" "}
              </>
            ) : (
              <>
                {zone ? Moment(event?.start_time, "hh:mm A") : moment(event?.start_time, "hh:mm a").format("hh:mm A")} -{" "}
              </>
            )}
            {zone ? Moment(event?.end_time, "hh:mm A") : moment(event?.end_time, "hh:mm a").format("hh:mm A")}
          </p>

          <p className={Styles.zone}>{code ? code : "EST"}</p>
          <p className={Styles.days}>
            {moment(event?.end_date).diff(moment(event?.start_date), "day") + 1}{" "}
            {"Days"}
          </p>
        </div>
        <div className={Styles.instructor}>
          {isInstructor ? (
            <p className="p">{event.course_full_name}</p>
          ) : (
            <>
              <p>{event?.instructor_name} </p>
              <button
                onClick={() => {
                  handleClick(index, event?.instructor_name);
                }}
              >
                {schedule_messages?.learn_more_btn}
                <Image src="/know.svg" width={14} height={14} alt="know" />
              </button>
            </>
          )}
        </div>
        <div className={Styles.price}>
          {/* {event?.event_currencies?.length > 1 ? (
            <>
              {userLocationPrice?.length ? (
                <>
                  <p className={Styles.cancelled}>
                    {userLocationPrice[0]?.currency_info?.currency_code}
                    {userLocationPrice[0]?.currency_info?.symbol}
                    {userLocationPrice[0]?.r_price}
                  </p>
                  <h6>
                    {userLocationPrice[0]?.currency_info?.currency_code}
                    {userLocationPrice[0]?.currency_info?.symbol}
                    {userLocationPrice[0]?.eb_price}
                  </h6>
                </>
              ) : (
                <>
                  <p className={Styles.cancelled}>
                    {defaultLocatinPrice[0]?.currency_info?.currency_code}
                    {defaultLocatinPrice[0]?.currency_info?.symbol}
                    {defaultLocatinPrice[0]?.r_price}
                  </p>
                  <h6>
                    {defaultLocatinPrice[0]?.currency_info?.currency_code}
                    {defaultLocatinPrice[0]?.currency_info?.symbol}
                    {defaultLocatinPrice[0]?.eb_price}
                  </h6>
                </>
              )}
            </>
          ) : (
            <> */}
          <p className={Styles.cancelled}>
            {event?.currency} {event?.retail_price}
          </p>
          <h6>
            {event?.currency} {event?.discount_price}
          </h6>
          {/* </>
          )} */}
        </div>
        <div className={Styles.register}>
          <Link href={event?.register_url || "#"}>
            <button className={Styles.btn}>{event?.is_sold_out === "Yes" ? "JOIN WAITLIST" : schedule_messages?.register_btn}</button>
          </Link>
          <p className={Styles.text}>{event?.sale_status_description}</p>
        </div>
      </div>

      <div className={`${Styles.mobile_card} ${active ? Styles.active_mobile : ""}`}>
        <div className={Styles.row_1}>
          <div className={Styles.dates}>
            <Image
              src={"/calendar.svg"}
              height={20}
              width={20}
              alt="calender"
            />
            <p>
              {moment(event?.start_date).format("MMM")}{" "}
              <span>{moment(event?.start_date).format("DD")}</span>-
              {moment(event?.start_date).format("MMM") !==
                moment(event?.end_date).format("MMM") ? (
                <>{moment(event?.end_date).format("MMM")}{" "}</>
              ) : (
                ""
              )}
              <span>{moment(event?.end_date).format("DD")}</span> (
              {moment(event?.end_date).diff(moment(event?.start_date), "day") +
                1}{" "}
              {"Days"})
            </p>
          </div>
          <div
            className={Styles.note}
            style={{
              backgroundColor:
                moment(event?.start_date).day() === 6 ||
                  moment(event?.start_date).day() === 0
                  ? "#ffeeda"
                  : "",
            }}
          >
            <p>
              {moment(event?.start_date).format("ddd")} -{""}
              {moment(event?.end_date).format("ddd")}
            </p>
          </div>
        </div>
        <div className={Styles.row_2}>
          <Image src={"/alarm.svg"} height={20} width={20} alt="time-icon" />
          <div className={Styles.timing}>
            <p>
              {Moment(event?.start_time, "A") === Moment(event?.end_time, "A") ? (
                <>
                  {zone ? Moment(event?.start_time, "hh:mm") : moment(event?.start_time, "hh:mm a").format("hh:mm")} -{" "}
                </>
              ) : (
                <>
                  {zone ? Moment(event?.start_time, "hh:mm A") : moment(event?.start_time, "hh:mm a").format("hh:mm A")} -{" "}
                </>
              )}
              {zone ? Moment(event?.end_time, "hh:mm A") : moment(event?.end_time, "hh:mm a").format("hh:mm A")} <span>{code ? code : "EST"}</span>
            </p>
          </div>
        </div>
        <div className={Styles.row_3}>
          <Image
            src={"/money.svg"}
            height={20}
            width={20}
            alt="currency-icon"
          />

          <div className={Styles.price}>
            <p className={Styles.cancelled}>
              {event?.currency} {event?.retail_price}
            </p>
            <h6>
              {event?.currency} {event?.discount_price}
            </h6>
          </div>
        </div>
        <div className={Styles.row_4}>
          {isInstructor ? (
            <div className={Styles.instructor}>
              <p className="p">{event?.course_full_name}</p>
            </div>
          ) : (
            <>
              <div className={Styles.instructor}>
                <Image
                  src={"/account_circle.svg"}
                  height={20}
                  width={20}
                  alt="account"
                />
                <p>{event?.instructor_name} </p>
              </div>
              <div className={Styles.know_more}>
                <button
                  onClick={() => {
                    handleClick(index, event?.instructor_name);
                  }}
                >
                  {schedule_messages?.learn_more_btn}
                  <Image src="/Vector (3).svg" width={14} height={14} alt="vector" />
                </button>
              </div>
            </>
          )}
        </div>
        <div className={Styles.register}>
          <p className={Styles.text}>
            {event?.sale_status_description}
          </p>
          <Link href={event?.register_url}>
            <button className={Styles.btn}>{event?.is_sold_out === "Yes" ? "JOIN WAITLIST" : schedule_messages?.register_btn}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SessionsRow;