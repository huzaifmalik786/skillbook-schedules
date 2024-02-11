import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Styles from "../../styles/components/forms/dropdown.module.scss";
type Props = {
  heading: string;
  arrow_width?: string;
  arrow_height?: string;
};
const Dropdown = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const ref = useRef<any>(null); // check later
  const [dropdownValue, setDropdownValue] = useState<string>("");

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className={Styles.dd_wrapper} ref={ref}>
      <div
        className={Styles.dd_header}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div className={Styles.dd_header_title}>
          {dropdownValue === "" ? props.heading : dropdownValue}
        </div>
        <div
          className={Styles.arrow}
          style={{
            width: `${props.arrow_width}`,
            height: `${props.arrow_height}`,
          }}
        >
          <Image src="/arrow_forward_ios.svg" alt="arrow" fill />
        </div>
      </div>
      {openDropdown && (
        <ul className={Styles.dd_list}>
          <li
            onClick={() => setDropdownValue("Lorem ipsum")}
            className={Styles.dd_list_item}
          >
            Lorem ipsum
          </li>
          <li
            onClick={() => setDropdownValue("Lorem ipsum")}
            className={Styles.dd_list_item}
          >
            Lorem ipsum
          </li>
          <li
            onClick={() => setDropdownValue("Lorem ipsum")}
            className={Styles.dd_list_item}
          >
            Lorem ipsum
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
