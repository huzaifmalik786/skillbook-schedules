import React, { useState } from "react";
import Image from "next/image";
import Styles from "../../styles/components/schedule/Highlights.module.scss";
import MultiCarousel from "../Carousel";
import { highlightDataType, images } from "../../interfaces/interfaces";
import { useScreenDimensions } from "use-screen-dimensions";
import ViewportWrapper from "../ViewportWrapper";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("../HighlightPopUp"));
type Props = {
  component: undefined | boolean;
  data?: highlightDataType
  read_more?: {
    position: string;
    about: string;
    image: images;
    highlight_images: images[];
  }
};

const Highlights = (props: Props) => {
  const { width } = useScreenDimensions();
  const isMobile = width < 950
  const [openModal, setOpenModal] = useState(false)
  const [openType, setOpenType] = useState<string>();
  const [active, setActive] = useState(-1);

  const handleClick = (index: number, type: string) => {
    setOpenType(type);
    setActive(index);
    setOpenModal(true);
  }
  return (
    <>
      {openModal &&
        <Modal openModal={openModal} setOpenModal={setOpenModal} images={openType == "schedule" ? props?.read_more?.highlight_images : props?.data?.highlight_images} active={active} setActive={setActive} />
      }
      <ViewportWrapper bgcolor="#f1f0f0" ids="highlight_carousel">
        <div
          className={Styles.highlights}
          style={
            props.component === true
              ? { padding: "56px 88px;" }
              : { padding: "29.3px 13px 16.3px 29px" }
          }
        >
          {!props.component && props?.read_more && (
            <div className={Styles.info}>
              <Image
                className={Styles.logo}
                src={!isMobile ? props?.read_more?.image?.desktop_image?.data?.attributes?.url : props?.read_more?.image?.mobile_image?.data?.attributes?.url}
                width={61}
                height={60}
                alt={!isMobile ? props?.read_more?.image?.desktop_image?.data?.attributes?.alternativeText : props?.read_more?.image?.mobile_image?.data?.attributes?.alternativeText}
              />

              <div>
                <p className={`${Styles.heading} p`}>
                  {props?.read_more?.position}
                </p>
                <p className="p">
                  {props?.read_more?.about}
                </p>
              </div>
            </div>
          )}

          <div className={Styles.highlight_carousel}>
            {props?.data?.highlight_images &&
              <MultiCarousel partialVisbile={isMobile ? 0 : 100} slides={2} slidesToSlide={isMobile ? 1 : 2} autoPlay={false} dots={true} buttons={true}>
                {
                  props.data.highlight_images.map((image, index) => {
                    return (
                      <Image
                        key={image?.id}
                        src={isMobile ? image?.mobile_image?.data?.attributes?.url : image?.desktop_image?.data?.attributes?.url}
                        width={367.74}
                        height={315}
                        alt={isMobile ? image?.mobile_image?.data?.attributes?.alternativeText : image?.desktop_image?.data?.attributes?.alternativeText}
                        style={{ objectFit: "contain", width: "100%", cursor:"pointer" }}
                        onClick={() => handleClick(index, "normal")}
                      />
                    )
                  })
                }
              </MultiCarousel>
            }
            {props?.read_more?.highlight_images &&
              <MultiCarousel partialVisbile={isMobile ? 0 : 100} slides={2} slidesToSlide={isMobile ? 1 : 2} autoPlay={false} dots={true} buttons={true}>
                {
                  props.read_more.highlight_images.map((image, index) => {
                    return (
                      <Image
                        style={{ objectFit: "contain", width: "100%", cursor:"pointer" }}
                        key={image?.id}
                        src={isMobile ? image?.mobile_image?.data?.attributes?.url : image?.desktop_image?.data?.attributes?.url}
                        width={215}
                        height={215}
                        alt={isMobile ? image?.mobile_image?.data?.attributes?.alternativeText : image?.desktop_image?.data?.attributes?.alternativeText}
                        onClick={() => handleClick(index, "schedule")}
                      />
                    )
                  })
                }
              </MultiCarousel>
            }

          </div>
        </div>
      </ViewportWrapper>

    </>
  );
};

export default Highlights;
