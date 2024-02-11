import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Styles from "../styles/components/CoursesMenuMobile.module.scss";
import Image from "next/image";
import { CourseCardType, CourseTagType } from "../interfaces/interfaces";


type Props = {
  clicked?: boolean
  setClicked: Function
  data?: CourseTagType
  courses?: {
    attributes: CourseCardType
  }[]
}

const CourseMenuMobile = (props: Props) => {
  // const [courseContentView, setCourseContentView] = useState<boolean>(false);
  const [filteredCourses, setFilteredCourses] = useState<any>();
  const [contentIndex, setContentIndex] = useState<number>(-1);
  const [filteredData, setFilteredData] = useState<any>();
  const [activeBtn, setActiveBtn] = useState<number>(-1);

  useEffect(() => {
    if (props.clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.clicked]);

  // useEffect(() => {
  //   setFilteredData(props?.courses?.filter(i => { return i?.attributes?.card?.course_categories?.data?.find(i => i?.attributes?.category == activeBtn) }))
  // }, [activeBtn])

  useEffect(() => {
    let filtered_courses: any = []
    props?.data?.data?.map(
      (category: any, index: number) => {
        const temparray =
          props?.courses?.filter(
            (item: any) => {
              return item?.attributes?.card?.course_categories?.data?.find(
                (i: any) =>
                  i?.attributes?.category == category.attributes.category
              );
            }
          );
        filtered_courses[index] = temparray;
      }
    );
    setFilteredCourses(filtered_courses);
  }, [])

  return (
    <>
      {props.clicked && (
        <div className={Styles.coursesWrapper}>
          <div className={Styles.heading}>
            <Link href="/">
              <Image src={"/Logo.svg"} alt="logo" height={41.39} width={240} />
            </Link>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                props.setClicked(!props.clicked);
              }}
            >
              <path
                d="M9.91691 7.98588C10.0883 8.16688 10.2161 8.3072 10.351 8.44049C12.0465 10.1355 13.7574 11.8178 15.4263 13.5381C15.7129 13.8553 15.903 14.2476 15.9741 14.669C16.0598 15.1685 15.7522 15.5726 15.3041 15.821C15.0999 15.9444 14.8644 16.0062 14.6259 15.999C14.3874 15.9918 14.156 15.9158 13.9597 15.7803C13.7594 15.6395 13.5744 15.4782 13.4077 15.299C11.6237 13.5184 9.84386 11.7351 8.02193 9.91098C7.8646 10.0513 7.72553 10.179 7.60051 10.3095C5.90359 12.0031 4.21229 13.7023 2.50414 15.386C2.27305 15.6217 1.99631 15.8079 1.69081 15.9332C1.18089 16.1269 0.579663 15.8813 0.25517 15.4281C0.100019 15.2145 0.0129974 14.959 0.0054791 14.6952C-0.00203923 14.4313 0.0702928 14.1713 0.213025 13.9492C0.34499 13.7645 0.494591 13.5929 0.659729 13.4371C2.45498 11.6439 4.25303 9.85205 6.09183 8.01815C5.95135 7.8624 5.82633 7.72349 5.69569 7.59721C4.00018 5.90082 2.29624 4.21284 0.613374 2.50382C0.351238 2.25196 0.155761 1.93907 0.0444599 1.59319C-0.104442 1.04035 0.130149 0.561881 0.606352 0.232144C0.825008 0.0834092 1.08386 0.0048027 1.3484 0.00680827C1.61293 0.00881384 1.87057 0.0913363 2.08694 0.243369C2.26867 0.380153 2.43833 0.532247 2.59405 0.697984C4.37665 2.47856 6.15785 4.26195 7.98259 6.08743C8.13852 5.94712 8.27759 5.82364 8.40401 5.69455C10.1009 3.99957 11.7908 2.29756 13.5018 0.618007C13.7585 0.360156 14.0708 0.16434 14.4149 0.0455264C14.9234 -0.114431 15.4825 0.164793 15.7789 0.606781C15.9254 0.826471 16.0024 1.08511 15.9999 1.3491C15.9974 1.61308 15.9155 1.87022 15.7648 2.08709C15.6284 2.26905 15.4766 2.43898 15.3111 2.59503C13.5313 4.37841 11.7473 6.15759 9.91691 7.98588Z"
                fill="#222222"
              />
            </svg>
          </div>
          <div className={Styles.courseHeading}>
            {props?.data?.data?.map((item, index) => {
              return (
                <div key={index} className={Styles.courseHeadingItem}>
                  <div className={Styles.headingItem}
                    onClick={() => {
                      setContentIndex(contentIndex == index ? -1 : index);
                      // setActiveBtn(index)
                    }}
                  >
                    {item?.attributes?.category}
                    <svg
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        setContentIndex(contentIndex == index ? -1 : index);
                        // setActiveBtn(index)
                      }}
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.77246 5.48101L2.19871 0.907248L0.522461 2.5835L6.77246 8.83351L13.0225 2.5835L11.3462 0.907249L6.77246 5.48101Z"
                        fill="#444444"
                      />
                    </svg>
                  </div>
                  {
                    index === contentIndex &&
                    <>
                      {filteredCourses && filteredCourses[contentIndex]?.length > 0 ? (
                        filteredCourses[contentIndex]?.map((item: any, indexInner: number) => {
                          return (
                            <Link key={indexInner} href={`/courses/${item?.attributes?.slug}`}>
                              <div
                                key={indexInner}
                                className={Styles.headingContents}
                              >
                                <div className={Styles.img_wrapper}>
                                  <Image
                                    src={item?.attributes?.card?.Course_logo?.mobile_image?.data?.attributes?.url}
                                    alt={item?.attributes?.card?.Course_logo?.mobile_image?.data?.attributes?.alternativeText}
                                    height={20.39}
                                    width={30}
                                  />
                                </div>
                                <div className={Styles.content}>
                                  {item?.attributes?.card?.name?.text}
                                  <div className={Styles.contentDesc}>
                                    {item?.attributes?.card?.course_duration}
                                    <button>{item?.attributes?.card?.Difficulty}</button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <p className="p">No courses found!</p>
                      )}
                    </>
                  }
                  <svg
                    width="328"
                    height="1"
                    viewBox="0 0 328 1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="2.18557e-08"
                      y1="0.75"
                      x2="328"
                      y2="0.750029"
                      stroke="#DFDFDF"
                      stroke-width="0.5"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default CourseMenuMobile;
