import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import Styles from "../../styles/components/landingPage/mininav.module.scss";
import { useScreenDimensions } from "use-screen-dimensions";

type Props = {
  menuItems: {
    Item: string;
    scroll_id: string;
  }[];
};

const MiniNav = (props: Props) => {
  const [activeId, setActiveId] = useState<string>("");

  const ref = useRef(null);

  const { width } = useScreenDimensions();
  const isMobile = width < 950;

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  useLayoutEffect(() => {

    gsap.to(
      ref.current,
      {
        position: "fixed",
        zIndex: 10000,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: 600,
          toggleActions: "play none none reverse",

        }
      }
    );
  }, [width]);

  const scrollToSection = (sectionId: any, index: number) => {
    setActiveId(sectionId);

    gsap.to(window, {
      scrollTo: {
        y: `#${sectionId}`,
        autoKill: false,
        offsetY: isMobile ? 65 : 50 // adjust this value to offset the scroll position
      },
      duration: 0.5,
    });
  };

  useLayoutEffect(() => {
    const listener = () => {
      let isActive = false;
      let scrollY = window.pageYOffset;
      props.menuItems?.map((item) => {
        const element = document.getElementById(item.scroll_id);

        if (element) {
          var elemTop = element.offsetTop;
          if (elemTop < scrollY + 80) {
            setActiveId(item.scroll_id);
            isActive = true
          }
        }
      })
      if (!isActive) {
        setActiveId("");
      }
    }
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);
  })

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper} ref={ref} id="mini-nav">
        <div className={Styles.mini_nav}>
          <div className={Styles.btns}>
            {props?.menuItems?.map((nav: any, index: number) => {
              return (
                <button
                  onClick={() => scrollToSection(nav.scroll_id, index)}
                  key={index}
                  className={
                    activeId === nav.scroll_id ? Styles.active_btn : Styles.nav_ele
                  }
                >
                  {nav.Item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniNav;
