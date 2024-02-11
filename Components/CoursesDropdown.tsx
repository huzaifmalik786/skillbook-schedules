import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Styles from "../styles/components/CoursesDropdown.module.scss";
import Image from "next/image";
import { CourseCardType, CourseTagType } from "../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";
import CreateHeading from "./CreateHeading";


type Props = {
  data?: {
    btn_text: string;
    course_categories: CourseTagType;
    course_details: {
      data: {
        id: number;
        attributes: CourseCardType;
      }[];
    }
  }
}

function disableBodyScroll() {
  document.body.style.overflowY = 'hidden';
}


const CoursesDropdown = (props: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 950;
  const [filteredCourses, setFilteredCourses] = useState<any>();
  const [activeBtn, setActiveBtn] = useState<number>(-1);
  const [active, setActive] = useState<boolean>(false); //For the First DropDown and Effect
  const [subMenu, setSubMenu] = useState<boolean>(false); //Showing the contents of courses at the right

  const handleOpen = () => {
    document.body.style.overflowX = "hidden";
    setActive(true);
  };

  useEffect(() => {
    // Disable body scroll when modal is opened
    if (active) {
      disableBodyScroll();
    }
  }, [active]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setActive(false);
      setSubMenu(false);
      document.body.style.overflow = "unset";
    }
  };

  const handleClick = (filter: number) => {
    setSubMenu(true);
    setActiveBtn(filter)
  }

  useEffect(() => {
    let filtered_courses: any = []
    props?.data?.course_categories?.data?.map(
      (category: any, index: number) => {
        const temparray =
          props?.data?.course_details?.data?.filter(
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
    <div className={Styles.dropdown} >
      <button className={Styles.dropbtn} onClick={handleOpen}>
        {props?.data?.btn_text || "Courses"}
        <Image
          src={"/WhiteArrow.svg"}
          width={9.88}
          height={9.88}
          alt="DropArrow"
        />
      </button>
      {active && (
        <div className={Styles.pageEffect}>
          <div className={Styles.max}>
          </div>
        </div>
      )}
      {active && (
        <div className={Styles.dropdown_menu} ref={dropdownRef}>
          <div className={Styles.menu_1}>
            {props?.data?.course_categories?.data?.map((ele, index) => {
              return (
                <div
                  className={Styles.menu1_item}
                  onClick={() => handleClick(index)}
                  key={index}
                  onMouseOver={() => handleClick(index)}
                >
                  <p className={`${Styles.ele_txt} p`}>{ele?.attributes?.category}</p>
                  <Image
                    src="/Vector 2 (Stroke).svg"
                    width={9.5}
                    height={9.5}
                    alt="arrow"
                  />
                </div>
              );
            })}
          </div>
          {subMenu && (
            <div className={Styles.menu_2} >
              <div className={Styles.subCourses}>
                {filteredCourses.length && filteredCourses[activeBtn]?.length > 0 ? (
                  <>
                    {filteredCourses[activeBtn]?.map((ele: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          href={`/courses/${ele?.attributes?.slug}`}
                          onClick={() =>
                            (document.body.style.overflowX = "hidden")
                          }
                        >
                          <div className={Styles.subEle}>
                            <Image
                              src={isMobile ? ele?.attributes?.card?.Course_logo?.mobile_image?.data?.attributes?.url : ele?.attributes?.card?.Course_logo?.desktop_image?.data?.attributes?.url}
                              height={50}
                              width={45}
                              alt={isMobile ? ele?.attributes?.card?.Course_logo?.mobile_image?.data?.attributes?.alternativeText : ele?.attributes?.card?.Course_logo?.desktop_image?.data?.attributes?.alternativeText}
                              className={Styles.course_logo}
                            />
                            <div className={Styles.sub_txt}>
                              {ele?.attributes?.card?.name?.tag ? (
                                <CreateHeading tag={ele?.attributes?.card?.name.tag} children={{ className: `${Styles.txt} p` }} text={ele?.attributes?.card?.name?.text} />
                              ) : (
                                <p className={`${Styles.txt} p`}>{ele?.attributes?.card?.name?.text}</p>
                              )}
                              <span>
                                <p className={`${Styles.days_txt} p`}>{ele?.attributes?.card?.course_duration}</p>
                                {ele?.attributes?.card?.Difficulty &&
                                  <p className={`${Styles.trending} p`}>{ele?.attributes?.card?.Difficulty}</p>
                                }
                              </span>
                            </div>
                            <div className={Styles.arrow}>
                              <Image
                                src={"/Vector 2 (Stroke).svg"}
                                width={6.47}
                                height={10.81}
                                alt="arrow"
                              />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <p className="p">No courses found!</p>
                )}

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CoursesDropdown;
